import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit { 

  show:boolean = true;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log("Ya estoy");
      this.show = false;
    }, 4000);

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 5000);

  }

}
