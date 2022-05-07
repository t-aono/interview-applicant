import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant } from 'app/model/applicant';
import { ApplicantService } from 'app/service/applicant.service';
import { Subscription } from 'rxjs';
import { SettingService } from '../../service/setting.service';
import { OriginalForm } from '../../model/form';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  applicant: any = {};
  formsSubscription: Subscription;
  forms: OriginalForm[] = [];
  reader = new FileReader();
  fileBlog: string | ArrayBuffer = '';
  fileName: string;

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private settingService: SettingService
  ) {
    this.formsSubscription = this.settingService.forms$.subscribe((forms) => {
      forms.forEach((form) => {
        this.forms.push(form);
        this.applicant[form.name] = '';
      });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  onChangeInput(inputName, event) {
    this.applicant[inputName] = event.target.value;
  }

  addApplicant(): void {
    this.applicantService
      .addApplicant(this.applicant, this.fileBlog, this.fileName)
      .then(() => this.router.navigateByUrl('/done'));
  }

  onChangeMedia(event) {
    this.applicant.media = event.target.files[0].name;
    this.fileName = event.target.files[0].name;
    this.reader.onload = (e) => {
      this.fileBlog = e.target.result;
    };
    this.reader.readAsArrayBuffer(event.target.files[0]);
  }

  clearInput() {
    this.applicant.media = '';
    this.applicant.name = '';
  }
}
