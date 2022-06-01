import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { ApiService, Genre } from 'src/app/api.service';
import {
  IntersectionObserverService,
  ObserverOptions,
} from 'src/app/intersection-observer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [IntersectionObserverService],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('sidebar') private sidebar!: ElementRef;
  public genres: Genre[] = [];
  private genreArray: string[] = [];
  public isDisabled: boolean = true;
  public hideFilter: boolean = true;
  public isButtonFixed: boolean = false;
  private observerOptions: ObserverOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  };

  constructor(
    private apiService: ApiService,
    private intersectionObserverService: IntersectionObserverService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.apiService
      .getGenres()
      .pipe(
        tap((genres: Genre[]) => {
          this.genres = genres;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.intersectionObserverService
      .createObserver(this.observerOptions, this.sidebar.nativeElement)
      .pipe(
        tap((isIntersecting: boolean) => {
          if (!isIntersecting && !this.isDisabled) {
            this.isButtonFixed = true;
          } else {
            this.isButtonFixed = false;
          }
        })
      )
      .subscribe();
  }

  public onGenreAdded(eventData: string) {
    if (!this.genreArray.includes(eventData)) {
      this.genreArray.push(eventData);
      this.isDisabled = false;
    } else {
      this.genreArray.splice(this.genreArray.indexOf(eventData), 1);
    }
    this.apiService.genreArray = this.genreArray;
    this.isDisabled = false;
  }

  public submitFilter() {
    this.router.navigate([], { relativeTo: this.route, fragment: 'filter' });
    this.isDisabled = true;
  }
}
