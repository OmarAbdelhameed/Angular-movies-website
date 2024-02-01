import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../model/IMovie';
import { ISearch, ISearchResult } from '../model/ISearch';
import { IMovieCastCrew, IMovieDetails, IVideo } from '../model/detailedMovie';
@Injectable({
  providedIn: 'root',
})
export class MovieApiServiceService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://api.themoviedb.org/3';
  apikey = '08cc33bd5ae3a747598ce2ad84376e66';

  //bannerapidata

  bannerApiData(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/trending/all/week?api_key=${this.apikey}`
    );
  }

  // trendingmovieapidata
  trendingMovieApiData(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/trending/movie/day?api_key=${this.apikey}`
    );
  }

  // searchmovive
  getSearchMovie(data: any): Observable<ISearch> {
    console.log(data, 'movie#');

    return this.http.get<ISearch>(
      `${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }

  // getmoviedatails
  getMovieDetails(data: string): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(
      `${this.baseurl}/movie/${data}?api_key=${this.apikey}`
    );
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<IVideo> {
    return this.http.get<IVideo>(
      `${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`
    );
  }

  // getMovieCast
  getMovieCast(data: any): Observable<IMovieCastCrew> {
    return this.http.get<IMovieCastCrew>(
      `${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`
    );
  }
  // action
  fetchActionMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`
    );
  }

  // adventure
  fetchAdventureMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`
    );
  }

  // animation
  fetchAnimationMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`
    );
  }

  // comedy
  fetchComedyMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`
    );
  }

  // documentary
  fetchDocumentaryMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=99`
    );
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=878`
    );
  }

  // thriller:53
  fetchThrillerMovies(): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=53`
    );
  }
}
