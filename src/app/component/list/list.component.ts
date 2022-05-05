import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'app/service/auth.service';
import { Applicant } from 'app/model/applicant';
import { ApplicantService } from 'app/service/applicant.service';

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
