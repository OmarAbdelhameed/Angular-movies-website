import { TestBed } from '@angular/core/testing';

import { FavouriteMoviesService } from './favourite-movies.service';

describe('FavouriteMoviesService', () => {
  let service: FavouriteMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
