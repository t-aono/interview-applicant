import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Applicant } from './class/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private applicantsCollection: AngularFirestoreCollection<Applicant>;
  applicants: Observable<Applicant[]>;
  applicant$: Observable<Applicant>;

  constructor(private afs: AngularFirestore) {
    this.applicantsCollection = afs.collection<Applicant>('applicants');
    this.applicants = this.applicantsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Applicant;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  // getApplicant(id: string) {
  //   const applicantDoc = this.afs.doc<Applicant>(`applicant/${id}`);
  //   this.applicant$ = applicantDoc.valueChanges();
  // }

  addApplicant(applicant: Applicant) {
    return this.applicantsCollection.add(applicant);
  }
}
