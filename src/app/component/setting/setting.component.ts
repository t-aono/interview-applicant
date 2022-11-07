import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import {
  debounce,
  debounceTime,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';

@Component({
  selector: 'ia-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, AfterViewInit {
  forms$: Observable<OriginalForm[]>;
  formsSubscription: Subscription;
  isUpdated: boolean = false;
  targetForm: OriginalForm = {
    key: this.settingService.formsCount + 1,
    label: '',
    name: '',
    isValid: true,
  };
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
    this.formsSubscription = this.forms$.subscribe((forms) => {
      forms.forEach((form) =>
        this.rows.push(
          new FormGroup({
            label: new FormControl(form.label, []),
            name: new FormControl(form.name, []),
          })
        )
      );
      // this.settingService.setFormsCount(forms.length);
    });
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
        tap((v) => console.log(v))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  setNewForm() {
    this.targetForm = {
      key: this.settingService.formsCount + 1,
      label: '',
      name: '',
      isValid: true,
    };
  }

  saveForm() {
    this.settingService.addForm(this.targetForm);
  }

  editForm(form) {
    this.targetForm = form;
  }

  updateForm() {
    this.settingService.editForm(this.targetForm);
    this.isUpdated = true;
    setTimeout(() => (this.isUpdated = false), 2000);
  }
}
