import { Component, OnInit } from '@angular/core';
import { signOut } from 'firebase/auth';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'ia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = '';
  isAdmin: boolean = false;
  currentUrl: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      if (user) this.isAdmin = true;
      else this.isAdmin = false;
    });
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log(event.url);
        if (['/', '/done'].includes(event.url) !== false) {
          this.title = '面接希望者　入力画面';
        } else {
          this.title = '面接希望者　管理画面';
        }
      });
  }

  logout() {
    signOut(this.authService.auth).then(() =>
      this.router.navigateByUrl('/login')
    );
  }
}
