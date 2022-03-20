import { Component, OnInit } from '@angular/core';
import { Applicant } from '../applicant';

@Component({
  selector: 'ia-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  applicant: Applicant = {
    kana: 'さとう',
    name: '佐藤',
    birthday: '19990123',
    tel: '09012345678',
  };

  constructor() {}

  ngOnInit(): void {}
}
