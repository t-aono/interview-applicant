import { Component, OnInit } from '@angular/core';
import { Applicant } from '../applicant';
import { ApplicantService } from '../applicant.service';

@Component({
  selector: 'ia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  applicants: Applicant[];

  constructor(private applicantService: ApplicantService) {
    this.applicants = [];
  }

  ngOnInit(): void {
    setTimeout(() => this.getApplicants(), 1000);
  }

  getApplicants(): void {
    this.applicantService
      .getApplicants()
      .subscribe((applicants) => (this.applicants = applicants));
  }
}
