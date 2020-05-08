import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public router: Router,
    private authService: AuthService

  ) { }

  ngOnInit() { }

  intentarLogin() {
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigateByUrl('/inicio');

    }).catch(err => alert('los datos no son correctos'));
  }

}
