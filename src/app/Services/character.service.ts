import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  selectedUrl: string = '';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get(`https://swapi.dev/api/people`);     
  }

  getCharacterDetailsById(id : any): Observable<any> {
    return this.http.get(`https://swapi.dev/api/people/` + id);     
  }
}

