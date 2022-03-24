import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Applicant } from '../class/applicant';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'ia-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  applicant$: Observable<Applicant>;
  inputs: { name: string };

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  ngOnInit(): void {
    const id = `${this.route.snapshot.paramMap.get('id')}`;
    const applicantDoc = this.afs.doc<Applicant>(`applicants/${id}`);
    this.applicant$ = applicantDoc.valueChanges();
  }
}
