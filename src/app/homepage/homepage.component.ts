import { Component } from '@angular/core';
import { CharacterService } from '../Services/character.service';
import { Router } from '@angular/router';
import { VehicleService } from '../Services/vehicle.service';
import { StarShipService } from '../Services/starships.service';
import { MoviesService } from '../Services/movies.service';
import { SpeciesService } from '../Services/species.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  allCharacterData: any = [];
  speciesData: any = [];
  allVehicles: any = [];
  allStarships: any = [];
  allMovies: any = [];
  allBirthYears: any = [];
  constructor(private characterService: CharacterService, private vehicleService: VehicleService,
    private starshipService: StarShipService,
    private moviesService: MoviesService,
    private allSpeciesService: SpeciesService,
    private router: Router) { }

  ngOnInit() {
    this.bindSpecies();
    this.loadVehicles();
    this.loadStarships();
    this.loadMovies();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicles().subscribe(vehicleData => {
      this.allVehicles = vehicleData?.results ?? [];
      this.vehicleService.allVehiclesData = vehicleData?.results ?? [];
    })
  }
  loadStarships() {
    this.starshipService.getAllStarShips().subscribe(starshipData => {
      this.allStarships = starshipData?.results ?? [];
      this.starshipService.allStarshipsData = starshipData?.results ?? [];
    })
  }

  loadMovies() {
    this.moviesService.getAllMovies().subscribe(moviesData => {
      this.allMovies = moviesData?.results ?? [];
      this.moviesService.allMoviesData = moviesData?.results ?? [];
    })
  }

  bindSpecies() {
    this.allSpeciesService.getAllSpecies().subscribe((species: { results: never[]; }) => {
      this.speciesData = species?.results ?? [];
      this.loadCharacters();
    });
  }

  loadCharacters() {
    this.characterService.getAllCharacters().subscribe(charactersData => {
      if (charactersData?.results?.length) {
        this.allCharacterData = this.bindCharactersGrid(charactersData?.results);
        console.log(this.allCharacterData);
        for (let item of this.allCharacterData) {
          this.allBirthYears.push(item.birth_year);
        }
      }
    });
  }

  openCharacter(character: any, characterSpecName: any) {
    this.router.navigate(['/profile'], { queryParams: { id: character.charAt(character.length - 2), specName: characterSpecName } })
    // console.log(character);
  }
  bindCharactersGrid(charactersData: any[]) {
    charactersData.forEach(character => {
      character.species = this.getSpeciesName(character.species);
    });
    return charactersData;
  }

  getSpeciesName(speciesUrl: any[]) {
    if (speciesUrl[0]) {
      return this.speciesData.find((species: { url: any; }) => species.url == speciesUrl[0])?.name;
    } else { return ""; }
  }
}
