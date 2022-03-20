import { Component, OnInit } from '@angular/core';
import { Applicant } from '../applicant';
import { APPLICANTS } from '../mock-applicants';

@Component({
  selector: 'ia-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  applicants: Applicant[] = APPLICANTS;

  constructor() {}

  ngOnInit(): void {}
}
