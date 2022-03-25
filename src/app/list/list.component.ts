import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from '../applicant';
import { ApplicantService } from '../applicant.service';

@Component({
  selector: 'ia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  applicants$: Observable<Applicant[]>;

  constructor(private applicantService: ApplicantService) {
    this.applicants$ = this.applicantService.applicants$;
  }

  ngOnInit(): void {}
}
