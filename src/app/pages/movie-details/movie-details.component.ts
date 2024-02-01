import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ICast, IMovieDetails } from 'src/app/model/detailedMovie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  // Variables to store the results of movie details, video, and cast
  getMovieDetailResult: IMovieDetails = {} as IMovieDetails;
  getMovieVideoResult!: string;
  getMovieCastResult!: ICast[];
  private subscriptions: Subscription[] = [];

  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.getMovie(id);
      this.getVideo(id);
      this.getMovieCast(id);
    }
  }

  getMovie(id: string): void {
    const sub = this.service.getMovieDetails(id).subscribe({
      next: (result) => {
        console.log(result, 'movie#');
        this.getMovieDetailResult = result;
        this.updateTags();
      },
      error: (error) => console.error('Failed to get movie details:', error),
      complete: () => console.log('Completed getting movie details'),
    });
    this.subscriptions.push(sub);
  }

  getVideo(id: string): void {
    const sub = this.service.getMovieVideo(id).subscribe({
      next: (result) => {
        console.log(result, 'video#');
        result.results.forEach((element: any) => {
          if (element.type == 'Trailer') {
            this.getMovieVideoResult = element.key;
          }
        });
      },
      error: (error) => console.error('Failed to get movie video:', error),
      complete: () => console.log('Movie video retrieval completed'),
    });
    this.subscriptions.push(sub);
  }

  getMovieCast(id: string): void {
    const sub = this.service.getMovieCast(id).subscribe({
      next: (result) => {
        console.log(result, 'cast#');
        this.getMovieCastResult = result.cast;
      },
      error: (error) => console.error('Failed to get movie cast:', error),
    });
    this.subscriptions.push(sub);
  }

  updateTags(): void {
    this.title.setTitle(
      `${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`
    );
    this.meta.updateTag({
      name: 'title',
      content: this.getMovieDetailResult.original_title,
    });
    this.meta.updateTag({
      name: 'description',
      content: this.getMovieDetailResult.overview,
    });

    // facebook
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `` });
    this.meta.updateTag({
      property: 'og:title',
      content: this.getMovieDetailResult.original_title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.getMovieDetailResult.overview,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
