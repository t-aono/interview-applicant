import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from 'app/service/applicant.service';
import { map, Subscription, tap } from 'rxjs';
import { OriginalForm } from 'app/model/form';
import { SettingService } from 'app/service/setting.service';
import { UploadFile } from 'app/model/uploadFile';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  applicant: any = {};
  uploadFiles: UploadFile[] = [
    { fileBlob: '', fileName: '' },
    { fileBlob: '', fileName: '' },
    { fileBlob: '', fileName: '' },
    { fileBlob: '', fileName: '' },
  ];
  formsSubscription: Subscription;
  forms: OriginalForm[] = [];
  reader = new FileReader();
  fileCount = 3;
  loading = false;

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private settingService: SettingService
  ) {
    this.loading = true;
    this.formsSubscription = this.settingService.forms$
      .pipe(
        map((forms) => forms.filter((form) => form.isValid)),
        tap((forms) => {
          forms.forEach((form) => {
            this.forms.push(form);
            this.applicant[form.name] = '';
          });
        })
      )
      .subscribe(() => (this.loading = false));
  }

  get fileCountArray() {
    return [...Array(this.fileCount).keys()];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  onChangeInput(event: Event, inputName: string) {
    this.applicant[inputName] = (event.target as HTMLInputElement).value;
  }

  addApplicant(): void {
    this.applicantService
      .addApplicant(this.applicant, this.uploadFiles)
      .then(() => {
        this.router.navigateByUrl('/done');
        this.clearInput();
      });
  }

  onChangeFile(event: Event, n: number) {
    const { target } = event;
    const { files } = target as HTMLInputElement;

    this.uploadFiles[n].fileName = files[0].name;

    this.reader.onload = (e) => {
      this.uploadFiles[n].fileBlob = e.target.result;
    };
    this.reader.readAsArrayBuffer(files[0]);
  }

  onClickFileClear(event: MouseEvent, n: number) {
    this.uploadFiles[n].fileName = '';

    const { target } = event;
    const { previousElementSibling } = target as HTMLButtonElement;
    (previousElementSibling as HTMLInputElement).value = '';
  }

  clearInput() {
    this.uploadFiles.forEach((file) => {
      file.fileBlob = '';
      file.fileName = '';
    });
  }
}
