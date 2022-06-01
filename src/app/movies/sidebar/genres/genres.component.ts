import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from 'src/app/api.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  @Input() public genreItem!: Genre;
  @Output() private addGenreId = new EventEmitter<string>();

  public toggle: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public emitArray(genreId: string) {
    this.addGenreId.emit(genreId);
  }
}
