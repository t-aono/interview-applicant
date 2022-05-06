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

  deleteForm(key) {
    if (window.confirm('非表示にしますか？')) {
      this.settingService.deleteForm(key);
    }
  }
}
