import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  selectedUrl: string = '';

  constructor(private http: HttpClient) { }

  getAllSpecies(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/species`);     
  }

}

