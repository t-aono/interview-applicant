import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant } from '../applicant';
import { ApplicantService } from '../applicant.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  applicant: Applicant = {
    kana: '',
    name: '',
    birthday: '',
    tel: '',
  };
  isAdmin: boolean = false;

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
}
