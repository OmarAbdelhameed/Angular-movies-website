import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';
import { FavouriteMoviesService } from 'src/app/service/favourite-movies.service';
import { log } from 'console';

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

  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  showAddedAlert: boolean = false;
  showRemovedAlert: boolean = false;

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
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
    console.log(movie);
    this.favouriteService.addToFavourites(movie);
    this.triggerAddedAlert();
  }

  isInFavourites(movieId: number) {
    return this.favouriteService.favourites.value.find(
      (favMovie) => favMovie.movieId === movieId
    );
  }

  // bannerdata
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      // console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
      // this.trendingMovieResult
    });
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }

  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }

  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }

  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }
}

