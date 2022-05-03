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
    src: '',
    name: '',
  };
  isAdmin: boolean = false;
  reader = new FileReader();
  fileUrl: string | ArrayBuffer = '';
  fileType: string = '';

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

  addApplicant(applicant: Applicant): void {
    this.applicantService
      .addApplicant(applicant)
      .then(() => this.router.navigateByUrl('/admin'));
  }

  onChangeInput(event) {
    const file = event.target.files[0];
    this.fileType = file.type;
    this.reader.onload = (e) => {
      this.fileUrl = e.target.result;
    };
    this.reader.readAsDataURL(file);
  }
}
