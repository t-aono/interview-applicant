import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { UploadFile } from 'app/model/uploadFile';
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

  async addApplicant(applicant: Applicant, uploadFiles: UploadFile[]) {
    const docRef = await this.applicantsCollection.add(applicant);
    const storage = getStorage();
    uploadFiles.forEach((file) => {
      const fileRef = ref(storage, `${docRef.id}/${file.fileName}`);
      const { fileBlob } = file;
      uploadBytes(fileRef, fileBlob as ArrayBuffer).then(() =>
        console.log('Uploaded a file!')
      );
    });
    return docRef;
  }
}
