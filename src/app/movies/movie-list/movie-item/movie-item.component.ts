import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/api.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() public movieItem!: Movie;
  public imageUrl: string = `https://www.themoviedb.org/t/p/w220_and_h330_face`;

  constructor() {}

  ngOnInit(): void {}
}
