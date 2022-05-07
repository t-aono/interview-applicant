import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant } from 'app/model/applicant';
import { ApplicantService } from 'app/service/applicant.service';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  applicant: Applicant = {
    media: '',
    name: '',
  };
  reader = new FileReader();
  fileBlog: string | ArrayBuffer = '';
  fileName: string;

  constructor(
    private applicantService: ApplicantService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
