import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'ia-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(form: NgForm): void {
    const { email, password } = form.value;
    createUserWithEmailAndPassword(this.authService.auth, email, password)
      .then(() => this.router.navigateByUrl('/admin'))
      .catch((error) => alert(error));
  }
}
