import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { SidebarComponent } from './movies/sidebar/sidebar.component';
import { MovieItemComponent } from './movies/movie-list/movie-item/movie-item.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { GenresComponent } from './movies/sidebar/genres/genres.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IntersectionObserverService } from './intersection-observer.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MovieItemComponent,
    MovieListComponent,
    MoviesComponent,
    GenresComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [IntersectionObserverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
