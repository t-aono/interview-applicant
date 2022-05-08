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
  targetForm: OriginalForm = {
    key: 0,
    label: '',
    name: '',
    isValid: true,
  };
  isUpdated: boolean = false;

  constructor(private settingService: SettingService) {
    this.forms$ = this.settingService.forms$;
    this.targetForm.key = this.settingService.formsCount + 1;
  }

  ngOnInit(): void {
    this.formsSubscription = this.forms$.subscribe(
      (forms) => (this.targetForm.key = forms.length + 1)
    );
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
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
