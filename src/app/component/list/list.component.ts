import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Applicant } from 'app/models/applicant';
import { ApplicantService } from 'app/models/applicant.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'ia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  applicants$: Observable<Applicant[]>;
  isAdmin: boolean;

  constructor(
    private applicantService: ApplicantService,
    private authService: AuthService
  ) {
    this.applicants$ = this.applicantService.applicants$;
  }

  ngOnInit(): void {
    this.authService
      .getAuthState()
      .pipe(
        tap((user) => (user ? (this.isAdmin = true) : (this.isAdmin = false)))
      );
  }
}