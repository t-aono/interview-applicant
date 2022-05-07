import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Applicant } from 'app/model/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private applicantsCollection: AngularFirestoreCollection<Applicant>;
  applicants$: Observable<Applicant[]>;

  constructor(private afs: AngularFirestore) {
    this.applicantsCollection = afs.collection<Applicant>('applicants');
    this.applicants$ = this.applicantsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Applicant;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  async addApplicant(applicant: any, fileBlob: any, fileName: string) {
    const docRef = await this.applicantsCollection.add(applicant);
    const storage = getStorage();
    const mediaRef = ref(storage, `${docRef.id}/${fileName}`);
    uploadBytes(mediaRef, fileBlob).then(() => console.log('Uploaded a file!'));
    return docRef;
  }
}
