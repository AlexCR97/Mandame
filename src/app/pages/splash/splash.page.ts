import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  timerTick: Subscription;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    this.timerTick = timer(1000, 1000).subscribe(second => {
      if (second >= 3) {
        this.timerTick.unsubscribe();
        this.router.navigateByUrl('/login');
      }
    });
  }

}
