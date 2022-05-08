import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, tap, Subscription, map } from 'rxjs';
import { AuthService } from 'app/service/auth.service';
import { Applicant } from 'app/model/applicant';
import { ApplicantService } from 'app/service/applicant.service';
import { SettingService } from '../../service/setting.service';
import { OriginalForm } from '../../model/form';

@Component({
  selector: 'ia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  applicants$: Observable<Applicant[]>;
  isAdmin: boolean;
  formsSubscription: Subscription;
  forms: OriginalForm[] = [];

  constructor(
    private applicantService: ApplicantService,
    private authService: AuthService,
    private settingService: SettingService
  ) {
    this.applicants$ = this.applicantService.applicants$;
    this.formsSubscription = this.settingService.forms$
      .pipe(map((forms) => forms.filter((form) => form.isValid)))
      .subscribe((forms) => (this.forms = forms));
  }

  ngOnInit(): void {
    this.authService
      .getAuthState()
      .pipe(
        tap((user) => (user ? (this.isAdmin = true) : (this.isAdmin = false)))
      );
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }
}
