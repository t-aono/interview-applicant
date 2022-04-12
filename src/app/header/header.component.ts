import { Component, OnInit, Optional } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = '面接希望者　入力画面';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    signOut(this.authService.auth).then(() =>
      this.router.navigateByUrl('/login')
    );
  }
}
