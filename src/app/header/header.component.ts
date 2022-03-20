import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = '面接希望者　入力画面';

  constructor() {}

  ngOnInit(): void {}
}
