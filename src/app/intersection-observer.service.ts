import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string | undefined;
  threshold?: number | undefined;
}

@Injectable()
export class IntersectionObserverService {
  private isIntersecting$ = new Subject<boolean>();

  public createObserver(options: ObserverOptions, element: Element) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isIntersecting$.next(true);
      } else {
        this.isIntersecting$.next(false);
      }
    }, options).observe(element);

    return this.isIntersecting$;
  }
}
