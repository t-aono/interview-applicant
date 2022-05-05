import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant } from '../models/applicant';
import { ApplicantService } from '../models/applicant.service';
import { AuthService } from '../auth.service';

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
  isAdmin: boolean = false;
  reader = new FileReader();
  fileBlog: string | ArrayBuffer = '';
  fileName: string;

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      if (user) this.isAdmin = true;
      else this.isAdmin = false;
    });
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
