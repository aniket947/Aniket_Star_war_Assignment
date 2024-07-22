import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  allMoviesData: [] = [];

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/films`);     
  }

}

