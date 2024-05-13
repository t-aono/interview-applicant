import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { OriginalForm } from 'app/model/form';
import { Firestore } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  firestore: Firestore = inject(Firestore);
  private formsCollection: AngularFirestoreCollection<OriginalForm>;
  forms$: Observable<OriginalForm[]>;
  formsCount = 0;

  constructor(private afs: AngularFirestore) {
    this.formsCollection = afs.collection<OriginalForm>('forms');
    this.forms$ = this.formsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions
          .map((a) => {
            const data = a.payload.doc.data() as OriginalForm;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
          .sort((a, b) => a.key - b.key)
      )
    );
  }

  addForm(form: OriginalForm) {
    this.formsCollection.add(form);
  }

  setFormsCount(count: number) {
    this.formsCount = count;
  }

  editForm(newForm: OriginalForm) {
    this.forms$.pipe(take(1)).subscribe((forms) =>
      forms.forEach((form) => {
        if (form.key === newForm.key) {
          this.formsCollection.doc(form.id).update(newForm);
        }
      })
    );
  }
}
