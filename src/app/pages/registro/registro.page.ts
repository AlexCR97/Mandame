import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() { }

  intentarRegistro() {
    this.router.navigateByUrl('/inicio');
  }

}
