import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ia-list',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm): void {
    const { email, password } = form.value;
    signInWithEmailAndPassword(this.authService.auth, email, password)
      .then(() => this.router.navigateByUrl('/admin'))
      .catch((error) => alert(error));
  }
}
