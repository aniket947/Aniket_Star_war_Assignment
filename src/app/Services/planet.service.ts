import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  allMoviesData: [] = [];

  constructor(private http: HttpClient) { }

  getAllPlanetData(url: string): Observable<any> {
    return this.http.get(url);     
  }

}

