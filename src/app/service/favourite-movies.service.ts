import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { favMovie } from '../model/favMovie';

@Injectable({
  providedIn: 'root',
})
export class FavouriteMoviesService {
  // get favourite movies from local storage
  favourites: BehaviorSubject<favMovie[]> = new BehaviorSubject<favMovie[]>(
    // if favourites was deleted from local storage create it again
    JSON.parse(localStorage.getItem('favourites') ?? '[]') || []
  );

  constructor() {}

  addToFavourites(movie: favMovie) {
    // before adding to favourites, check if it is already there
    if (
      this.favourites.value.find(
        (favMovie) => favMovie.movieId === movie.movieId
      )
    ) {
      return;
    }

    this.favourites.next([...this.favourites.value, movie]);
    localStorage.setItem('favourites', JSON.stringify(this.favourites.value));
    this.updateFavourites();
  }

  removeFromFavourites(movieId: number) {
    let favMovies = this.favourites.value;
    favMovies = favMovies.filter((movie) => movie.movieId !== movieId);
    this.favourites.next(favMovies);
    localStorage.setItem('favourites', JSON.stringify(favMovies));
    this.updateFavourites();
  }

  updateFavourites() {
    this.favourites.next(JSON.parse(localStorage.getItem('favourites') ?? ''));
  }
}
