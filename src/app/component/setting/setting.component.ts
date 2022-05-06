import { Component, OnInit } from '@angular/core';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ia-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  forms$: Observable<OriginalForm[]>;

  constructor(private settingService: SettingService) {
    this.forms$ = this.settingService.forms$;
    // this.forms$.subscribe((v) => console.log(v));
  }

  ngOnInit(): void {}
}
