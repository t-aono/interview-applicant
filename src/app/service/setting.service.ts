import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map, filter } from 'rxjs';
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

  async updateValues(rows): Promise<boolean> {
    rows.forEach(async (row) => {
      if (row.id && row.label && row.name) {
        await this.formsCollection.doc(row.id).update(row);
      }
    });

    const updateRows = await rows.filter(
      (row) => row.id && row.label && row.name
    );
    return updateRows.length === rows.length;
  }

  async addNewRow(key: number): Promise<string> {
    const formDoc = await this.formsCollection.doc();
    const id = formDoc.ref.id;
    formDoc.set({ id, key, label: '', name: '', isValid: true });
    return id;
  }
}
