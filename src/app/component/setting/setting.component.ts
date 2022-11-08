import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import { debounceTime, Observable, Subscription, tap, take } from 'rxjs';

@Component({
  selector: 'ia-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  forms$: Observable<OriginalForm[]>;
  formsSubscription: Subscription;
  isUpdated: boolean = false;
  // targetForm: OriginalForm = {
  //   key: this.settingService.formsCount + 1,
  //   label: '',
  //   name: '',
  //   isValid: true,
  // };
  formGroup = new FormGroup({
    rows: new FormArray([]),
  });

  constructor(private settingService: SettingService) {
    this.forms$ = this.settingService.forms$;
  }

  get rows(): FormArray {
    return this.formGroup.get('rows') as FormArray;
  }

  get rowsControls(): FormGroup[] {
    return this.rows.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.formsSubscription = this.forms$
      .pipe(
        take(1),
        tap((forms) => {
          forms.forEach((form) =>
            this.rows.push(
              new FormGroup({
                id: new FormControl(form.id, []),
                label: new FormControl(form.label, []),
                name: new FormControl(form.name, []),
                isValid: new FormControl(form.isValid, []),
              })
            )
          );
        })
      )
      .subscribe(() => {
        this.formGroup.valueChanges
          .pipe(
            debounceTime(2000),
            tap(({ rows }) => this.settingService.updateRows(rows))
          )
          .subscribe(() => {
            this.isUpdated = true;
            setTimeout(() => (this.isUpdated = false), 2000);
          });
      });
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  async addForm() {
    const key = this.rows.length + 1;
    const id = await this.settingService.addNewRow(key);
    this.rows.push(
      new FormGroup({
        id: new FormControl(id, []),
        label: new FormControl('', []),
        name: new FormControl('', []),
        isValid: new FormControl(true, []),
      })
    );
  }
}
