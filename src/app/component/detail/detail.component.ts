import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Applicant } from '../../models/applicant';

@Component({
  selector: 'ia-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private id: string;
  private applicantDoc: AngularFirestoreDocument<Applicant>;
  applicant$: Observable<Applicant>;
  isUpdated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = `${this.route.snapshot.paramMap.get('id')}`;
    this.applicantDoc = this.afs.doc<Applicant>(`applicants/${this.id}`);
    this.applicant$ = this.applicantDoc.valueChanges();
  }

  updateApplicant(applicant: Applicant): void {
    this.applicantDoc.update(applicant);
    this.isUpdated = true;
  }

  deleteApplicant(): void {
    if (window.confirm('削除しますか？')) {
      this.applicantDoc
        .delete()
        .then(() => this.router.navigateByUrl('/admin'));
    }
  }
}
