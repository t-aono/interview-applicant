import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Applicant } from '../models/applicant';
import { ApplicantService } from '../models/applicant.service';
import { AuthService } from '../auth.service';

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
