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
    return this.formsCollection.add(form);
  }

  deleteForm(deleteKey: number) {
    this.forms$.subscribe((forms) =>
      forms.forEach((form) => {
        if (form.key === deleteKey) {
          this.formsCollection.doc(form.id).update({
            key: form.key,
            label: form.label,
            name: form.name,
            isValid: false,
          });
        }
      })
    );
  }
}
