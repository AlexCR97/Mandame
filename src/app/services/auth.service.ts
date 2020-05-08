import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router) { }

  login(email: string, contrasena: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, contrasena).then(user => {
        console.log('estás logueado', user);
        resolve(user);
      }).catch(err => rejected(err));

    });
  }
}
