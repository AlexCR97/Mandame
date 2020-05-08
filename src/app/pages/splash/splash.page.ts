import { Component, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  imgClassQueue = ['img-left', 'img-center', 'img-right', 'img-left', 'img-center', 'img-right', 'img-left', 'img-center', 'img-right', 'img-left', 'img-center', 'img-invisible'];
  imgClass = 'img-invisible';

  timerTick: Subscription;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    let index = 0;
    this.imgClass = this.imgClassQueue[index];

    this.timerTick = timer(0, 500).subscribe(second => {

      this.imgClass = this.imgClassQueue[index];

      if (index >= this.imgClassQueue.length) {
        this.timerTick.unsubscribe();
        this.router.navigateByUrl('/login');
      }

      index++;
    });
  }

}
