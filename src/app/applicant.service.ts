import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Applicant } from './applicant';
import { Applicant } from './class/applicant';
import { APPLICANTS } from './mock-applicants';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  applicants = APPLICANTS;

  constructor() {}

  getApplicants(): Observable<Applicant[]> {
    return of(this.applicants);
  }

  addApplicant(applicant: Applicant): void {
    this.applicants.push(new Applicant(applicant));
    console.log(this.applicants);
  }
}
