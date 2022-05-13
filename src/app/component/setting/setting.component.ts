import { Component, OnInit, OnDestroy } from '@angular/core';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ia-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  forms$: Observable<OriginalForm[]>;
  formsSubscription: Subscription;
  isUpdated: boolean = false;
  targetForm: OriginalForm = {
    key: this.settingService.formsCount + 1,
    label: '',
    name: '',
    isValid: true,
  };

  constructor(private settingService: SettingService) {
    this.forms$ = this.settingService.forms$;
  }

  ngOnInit(): void {
    this.formsSubscription = this.forms$.subscribe((forms) => {
      this.settingService.setFormsCount(forms.length);
    });
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
