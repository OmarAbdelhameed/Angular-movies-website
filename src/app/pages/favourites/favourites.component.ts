import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { favMovie } from 'src/app/model/favMovie';
import { FavouriteMoviesService } from 'src/app/service/favourite-movies.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites$: Observable<favMovie[]>;
  favouritesLength: number = 0;
  showRemovedAlert: boolean = false;
  constructor(
    private favouriteService: FavouriteMoviesService,
    private title: Title
  ) {
    
    this.favourites$ = this.favouriteService.favourites;
    this.favourites$.subscribe((favMovies) => {
      this.favouritesLength = favMovies.length;
    });
    this.title.setTitle('Favourite Movies');
  }

  triggerRemovedAlert() {
    this.showRemovedAlert = true;
    setTimeout(() => (this.showRemovedAlert = false), 3000); // Auto-hide after 3 seconds
  }

  removeFromFavourites(movieId: number) {
    this.favouriteService.removeFromFavourites(movieId);
    this.triggerRemovedAlert();
  }

  ngOnInit(): void {}
}
