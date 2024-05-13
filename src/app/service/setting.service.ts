import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { OriginalForm } from 'app/model/form';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  firestore: Firestore = inject(Firestore);
  formsCollection = collection(this.firestore, 'forms');
  forms$: Observable<OriginalForm[]>;
  formsCount = 0;

  constructor() {
    this.forms$ = (
      collectionData(this.formsCollection) as Observable<OriginalForm[]>
    ).pipe(map((data) => data.sort((a, b) => a.key - b.key)));
  }

  addForm(form: OriginalForm) {
    addDoc(this.formsCollection, form);
  }

  setFormsCount(count: number) {
    this.formsCount = count;
  }

  editForm(newForm: OriginalForm) {
    this.forms$.pipe(take(1)).subscribe((forms) =>
      forms.forEach((form) => {
        if (form.key === newForm.key) {
          const document = doc(this.formsCollection, form.id);
          updateDoc(document as DocumentReference<OriginalForm>, newForm);
        }
      })
    );
  }
}
