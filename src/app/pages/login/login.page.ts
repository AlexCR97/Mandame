import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit() { }

  intentarLogin() {
    this.router.navigateByUrl('/inicio');
  }

}
