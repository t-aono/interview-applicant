import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import {
  debounceTime,
  Observable,
  Subscription,
  tap,
  take,
  mergeMap,
} from 'rxjs';

@Component({
  selector: 'ia-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  forms$: Observable<OriginalForm[]>;
  formsSubscription: Subscription;
  isUpdated: boolean = false;
  formArray = new FormArray([]);

  constructor(private settingService: SettingService) {
    this.forms$ = this.settingService.forms$;
  }

  get formArrayControls(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.formsSubscription = this.forms$
      .pipe(
        take(1),
        tap((forms) => {
          forms.forEach((form) =>
            this.formArray.push(
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
        this.formArray.valueChanges
          .pipe(
            debounceTime(2000),
            mergeMap((values) => this.settingService.updateValues(values))
          )
          .subscribe((isUpdated) => {
            if (isUpdated) {
              this.isUpdated = true;
              setTimeout(() => (this.isUpdated = false), 2000);
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  async addForm() {
    const key = this.formArray.length + 1;
    const id = await this.settingService.addNewRow(key);
    this.formArray.push(
      new FormGroup({
        id: new FormControl(id, []),
        label: new FormControl('', []),
        name: new FormControl('', []),
        isValid: new FormControl(true, []),
      })
    );
  }
}
