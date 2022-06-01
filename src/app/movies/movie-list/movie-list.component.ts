import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  IntersectionObserverService,
  ObserverOptions,
} from 'src/app/intersection-observer.service';
import { ApiService, Movie, ResponseData } from '../../api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [IntersectionObserverService],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  public page: number = 1;
  public maxPages!: number;
  public totalResults!: number;
  public movieList: Movie[] = [];
  private observerOptions: ObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  private autoLoad = false;
  @ViewChild('loadBtn') loadBtn!: ElementRef;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.fetchMovies().subscribe();
  }

  ngAfterViewInit(): void {
    this.intersectionObserverService
      .createObserver(this.observerOptions, this.loadBtn.nativeElement)
      .pipe(
        tap((isIntersected: boolean) => {
          if (isIntersected && this.autoLoad) {
            this.loadMore();
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: Params | string | null) => {
      if (fragment === 'filter') {
        this.page = 1;
        this.movieList = [];
        this.fetchMovies().subscribe();
        this.autoLoad = false;
        this.router.navigate([]);
      }
    });
  }

  public loadMore() {
    if (this.page < this.maxPages) {
      this.page += 1;
      this.fetchMovies().subscribe();
      this.autoLoad = true;
    }
  }

  private fetchMovies(): Observable<ResponseData> {
    return this.apiService
      .getMovies(this.page, this.apiService.genreArray)
      .pipe(
        tap((movieData: ResponseData) => {
          this.totalResults = movieData.total_results;
          this.maxPages = movieData.total_pages;
          this.movieList.push(...movieData.results);
        })
      );
  }
}
