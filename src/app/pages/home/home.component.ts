import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { FavouriteMoviesService } from 'src/app/service/favourite-movies.service';
import { Observable, Subscription } from 'rxjs';
import { IMovie, IMovieResult } from 'src/app/model/IMovie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private favouriteService: FavouriteMoviesService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Home');
    this.meta.updateTag({
      name: 'description',
      content: 'watch online movies',
    });
  }

  private subscriptions: Subscription[] = [];
  bannerResult: IMovieResult[] = [];
  trendingMovieResult: IMovieResult[] = [];
  actionMovieResult: IMovieResult[] = [];
  adventureMovieResult: IMovieResult[] = [];
  animationMovieResult: IMovieResult[] = [];
  comedyMovieResult: IMovieResult[] = [];
  documentaryMovieResult: IMovieResult[] = [];
  scienceFictionMovieResult: IMovieResult[] = [];
  thrillerMovieResult: IMovieResult[] = [];
  showAddedAlert: boolean = false;
  showRemovedAlert: boolean = false;

  ngOnInit(): void {
    this.fetchMovies('banner', this.service.bannerApiData());
    this.fetchMovies('trending', this.service.trendingMovieApiData());
    this.fetchMovies('action', this.service.fetchActionMovies());
    this.fetchMovies('adventure', this.service.fetchAdventureMovies());
    this.fetchMovies('animation', this.service.fetchAnimationMovies());
    this.fetchMovies('comedy', this.service.fetchComedyMovies());
    this.fetchMovies('documentary', this.service.fetchDocumentaryMovies());
    this.fetchMovies(
      'sciencefiction',
      this.service.fetchScienceFictionMovies()
    );
    this.fetchMovies('thriller', this.service.fetchThrillerMovies());
  }

  triggerAddedAlert() {
    this.showAddedAlert = true;
    setTimeout(() => (this.showAddedAlert = false), 3000); // Auto-hide after 3 seconds
  }

  triggerRemovedAlert() {
    this.showRemovedAlert = true;
    setTimeout(() => (this.showRemovedAlert = false), 3000); // Auto-hide after 3 seconds
  }

  addToOrRemoveFromFavourites(
    movieId: number,
    imgUrl: string,
    poster_path: string,
    routerLink: any[]
  ) {
    if (this.isInFavourites(movieId)) {
      this.favouriteService.removeFromFavourites(movieId);
      this.triggerRemovedAlert();
      return;
    }

    let movie = {
      movieId: movieId,
      imgSrc: imgUrl + poster_path,
      routerLink: routerLink,
    };
    this.favouriteService.addToFavourites(movie);
    this.triggerAddedAlert();
  }

  isInFavourites(movieId: number) {
    return this.favouriteService.favourites.value.find(
      (favMovie) => favMovie.movieId === movieId
    );
  }

  fetchMovies(type: string, observable: Observable<IMovie>): void {
    const sub = observable.subscribe({
      next: (result) => {
        switch (type) {
          case 'banner':
            this.bannerResult = result.results;
            break;
          case 'trending':
            this.trendingMovieResult = result.results;
            break;
          case 'action':
            this.actionMovieResult = result.results;
            break;
          case 'adventure':
            this.adventureMovieResult = result.results;
            break;
          case 'animation':
            this.animationMovieResult = result.results;
            break;
          case 'comedy':
            this.comedyMovieResult = result.results;
            break;
          case 'documentary':
            this.documentaryMovieResult = result.results;
            break;
          case 'sciencefiction':
            this.scienceFictionMovieResult = result.results;
            break;
          case 'thriller':
            this.thrillerMovieResult = result.results;
            break;
          default:
            console.error(`Unknown movie type: ${type}`);
        }
      },
      error: (error) => console.error(`Failed to fetch ${type} movies:`, error),
    });
    this.subscriptions.push(sub);
  }
}
