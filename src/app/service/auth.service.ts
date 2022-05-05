import { Injectable, Optional } from '@angular/core';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Optional() public auth: Auth) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getAuthState() {
    return authState(this.auth);
  }
}
