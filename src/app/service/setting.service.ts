import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { OriginalForm } from 'app/model/form';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private formsCollection: AngularFirestoreCollection<OriginalForm>;
  forms$: Observable<OriginalForm[]>;

  constructor(private afs: AngularFirestore) {
    this.formsCollection = afs.collection<OriginalForm>('forms');
    this.forms$ = this.formsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as OriginalForm;
          return data;
        })
      )
    );
  }
}
