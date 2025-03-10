import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarShipService {

  allStarshipsData: [] = [];

  constructor(private http: HttpClient) { }

  getAllStarShips(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/starships`);     
  }

}

