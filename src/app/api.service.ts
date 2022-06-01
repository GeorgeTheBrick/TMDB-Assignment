import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ResponseData {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Genre {
  name: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  genreArray: string[] = [];
  private apiKey = environment.API_KEY;
  constructor(private http: HttpClient) {}

  public getMovies(page: number, filter?: string[]): Observable<ResponseData> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=${
          this.apiKey
        }&page=${page}&with_genres=${filter?.join()}`
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getGenres(): Observable<Genre[]> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`
      )
      .pipe(map((data: any) => data.genres));
  }
}
