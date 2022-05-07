import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Applicant } from 'app/model/applicant';
import { ApplicantService } from 'app/service/applicant.service';
import { stringify } from 'querystring';
import { map, pipe, Subscription } from 'rxjs';
import { SettingService } from '../../service/setting.service';
import { OriginalForm } from '../../model/form';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
  applicant: Applicant = {
    media: '',
    name: '',
  };
  reader = new FileReader();
  fileBlog: string | ArrayBuffer = '';
  fileName: string;
  formGroup: FormGroup;
  formsSubscription: Subscription;

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private formBuilder: FormBuilder,
    private settingService: SettingService
  ) {
    this.formsSubscription = this.settingService.forms$
      .pipe(
        map((forms) => {
          return forms.map((form) => form.name);
        })
      )
      .subscribe((formNames) => {
        // const group = {};
        // formNames.forEach((name) => {
        //   group[name] = new FormControl('');
        // });
        // console.log(group);
        // this.formGroup = new FormGroup(group);
      });

    this.formGroup = this.formBuilder.group({
      name: ['', []],
      tel: ['', []],
      email: ['', []],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const c = this.formGroup.valueChanges.subscribe((v) => console.log(v));
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
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
