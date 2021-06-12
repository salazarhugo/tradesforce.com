import {Component, Input, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

export interface Image {
  url: string
  caption: string
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  @Input() images: Image[]
  @Input() interval: number = 4000
  subscription: Subscription;

  constructor() { }

  slideIndex = 0;

  ngOnInit(): void {
    const source = interval(this.interval)
    this.subscription = source.subscribe(val => this.slideIndex = (this.slideIndex+1) % this.images.length);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  plusSlides(n) {
    this.subscription.unsubscribe();
    this.slideIndex = (this.slideIndex+n) % this.images.length
  }
}
