export class Applicant {
  id?: string;
  kana: string;
  name: string;
  birthday: string;
  tel: string;

  constructor(applicant: Applicant) {
    this.id = applicant.id;
    this.kana = applicant.kana;
    this.name = applicant.name;
    this.birthday = applicant.birthday;
    this.tel = applicant.tel;
  }
}
