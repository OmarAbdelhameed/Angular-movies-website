import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { favMovie } from '../model/favMovie';

@Injectable({
  providedIn: 'root',
})
export class FavouriteMoviesService {
  favourites: BehaviorSubject<favMovie[]> = new BehaviorSubject<favMovie[]>(
    this.getFavouritesFromLocalStorage()
  );

  constructor() {}

  addToFavourites(movie: favMovie) {
    if (
      !this.favourites.value.find(
        (favMovie) => favMovie.movieId === movie.movieId
      )
    ) {
      this.favourites.next([...this.favourites.value, movie]);
      this.updateFavourites();
    }
  }

  removeFromFavourites(movieId: number) {
    let favMovies = this.favourites.value.filter(
      (movie) => movie.movieId !== movieId
    );
    this.favourites.next(favMovies);
    this.updateFavourites();
  }

  updateFavourites() {
    try {
      localStorage.setItem('favourites', JSON.stringify(this.favourites.value));
    } catch (error) {
      console.error('Failed to update favourites in localStorage:', error);
    }
  }

  getFavouritesFromLocalStorage(): favMovie[] {
    try {
      const favourites = JSON.parse(localStorage.getItem('favourites') ?? '[]');
      return Array.isArray(favourites) ? favourites : [];
    } catch (error) {
      console.error('Failed to get favourites from localStorage:', error);
      return [];
    }
  }
}
