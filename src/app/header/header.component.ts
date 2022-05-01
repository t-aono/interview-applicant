import { Component, OnInit } from '@angular/core';
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
  isAdmin: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      if (user) this.isAdmin = true;
      else this.isAdmin = false;
    });
  }

  logout() {
    signOut(this.authService.auth).then(() =>
      this.router.navigateByUrl('/login')
    );
  }
}
