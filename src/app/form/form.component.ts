import { Component, OnInit } from '@angular/core';
import { Applicant } from '../applicant';
import { ApplicantService } from '../applicant.service';

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

  constructor(private applicantService: ApplicantService) {}

  ngOnInit(): void {}

  addApplicant(applicant: Applicant): void {
    this.applicantService.addApplicant(applicant);
  }
}
