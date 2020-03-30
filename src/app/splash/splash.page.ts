import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  imagen:string = "assets/icon/logo.png"

  constructor() { }

  ngOnInit() {
  }

}
