import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { Applicant } from 'app/model/applicant';
import { OriginalForm } from '../../model/form';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'ia-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private id: string;
  private applicantDoc: AngularFirestoreDocument<Applicant>;
  applicant$: Observable<Applicant>;
  isUpdated: boolean = false;
  formsSubscription: Subscription;
  forms: OriginalForm[] = [];
  files: {
    name: string;
    url: string;
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    private settingService: SettingService
  ) {
    this.formsSubscription = this.settingService.forms$.subscribe(
      (forms) => (this.forms = forms)
    );
  }

  ngOnInit(): void {
    this.id = `${this.route.snapshot.paramMap.get('id')}`;
    this.applicantDoc = this.afs.doc<Applicant>(`applicants/${this.id}`);
    this.applicant$ = this.applicantDoc.valueChanges();

    const storage = getStorage();
    const folderRef = ref(storage, `${this.id}`);
    listAll(folderRef).then((res) =>
      res.items.forEach((itemRef) => {
        console.log(itemRef.name);
        const name = itemRef.name;
        getDownloadURL(itemRef).then((url) => this.files.push({ name, url }));
      })
    );
  }

  ngOnDestroy(): void {
    this.formsSubscription.unsubscribe();
  }

  updateApplicant(applicant: Applicant): void {
    this.applicantDoc.update(applicant);
    this.isUpdated = true;
    setTimeout(() => (this.isUpdated = false), 2000);
  }

  deleteApplicant(): void {
    if (window.confirm('削除しますか？')) {
      this.applicantDoc
        .delete()
        .then(() => this.router.navigateByUrl('/admin'));
    }
  }
}
