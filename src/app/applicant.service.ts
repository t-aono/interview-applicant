import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Applicant } from './class/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private applicantsCollection: AngularFirestoreCollection<Applicant>;
  applicants: Observable<Applicant[]>;

  constructor(private afs: AngularFirestore) {
    this.applicantsCollection = afs.collection<Applicant>('applicants');
    this.applicants = this.applicantsCollection.valueChanges();
  }

  addApplicant(applicant: Applicant) {
    return this.applicantsCollection.add(applicant);
  }
}
