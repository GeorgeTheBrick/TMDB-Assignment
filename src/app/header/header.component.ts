import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import {
  IntersectionObserverService,
  ObserverOptions,
} from '../intersection-observer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [IntersectionObserverService],
})
export class HeaderComponent implements AfterViewInit {
  public hide: boolean = false;
  @ViewChild('header') private header!: ElementRef;
  private observerOptions: ObserverOptions = {
    root: null,
    rootMargin: '64px',
    threshold: 1.0,
  };

  constructor(
    private intersectionObserverService: IntersectionObserverService
  ) {}

  ngAfterViewInit(): void {
    this.intersectionObserverService
      .createObserver(this.observerOptions, this.header.nativeElement)
      .pipe(
        tap((isIntersecting: boolean) => {
          if (!isIntersecting) {
            this.hide = true;
          } else {
            this.hide = false;
          }
        })
      )
      .subscribe();
  }
}
