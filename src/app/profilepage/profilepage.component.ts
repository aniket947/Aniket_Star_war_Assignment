import { Component } from '@angular/core';
import { CharacterService } from '../Services/character.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../Services/vehicle.service';
import { StarShipService } from '../Services/starships.service';
import { MoviesService } from '../Services/movies.service';
import { PlanetService } from '../Services/planet.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {

  selectedCharacterData: any;
  characterId: string = '';
  characterSpecies: string = '';
  selectedPlanetData: string = '';
  characterVehicles: any[] = [];
  characterStarships: any[] = [];
  characterMovies: any[] = [];

  constructor(private characterService: CharacterService, private route: ActivatedRoute,
    private vehicleService: VehicleService,private starshipService: StarShipService,
     private moviesService: MoviesService,private planetService: PlanetService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.characterId = params['id'];
      if(params['specName']){
      this.characterSpecies = params['specName'];
    }
    else{
      this.characterSpecies = 'n/a'
    }
    });
  }

  ngOnInit() {

    this.getCharaterDetailsData();

  }

  getVehiclesData() {
    this.characterVehicles = [];
    this.selectedCharacterData.vehicles.forEach((vehicleUrl: any) => {
      let vehicleDetails : any = this.vehicleService.allVehiclesData.find(veh => veh["url"] == vehicleUrl);
     if (vehicleDetails){
      this.characterVehicles.push(vehicleDetails);
      console.log(this.characterVehicles)
     }
     
    });
  }

  getStarshipsData() {
    this.characterStarships = [];
    this.selectedCharacterData.starships.forEach((startshipUrl: any) => {
      let starshipDetails : any = this.starshipService.allStarshipsData.find(ship => ship["url"] == startshipUrl);
     if (starshipDetails){
      this.characterStarships.push(starshipDetails);
      console.log(this.characterStarships)
     }
     
    });
  }

  getMoviesData() {
    this.characterMovies = [];
    this.selectedCharacterData.films.forEach((filmsUrl: any) => {
      let moviesDetails : any = this.moviesService.allMoviesData.find(film => film["url"] == filmsUrl);
     if (moviesDetails){
      this.characterMovies.push(moviesDetails);
      
     }
     
    });
    console.log(this.characterMovies)
  }

  getCharaterDetailsData() {
    this.characterService.getCharacterDetailsById(this.characterId).subscribe(data => {
      this.selectedCharacterData = data;
      console.log(this.selectedCharacterData);
      this.getPlanetName(this.selectedCharacterData.homeworld)
      this.getVehiclesData();
      this.getStarshipsData();
      this.getMoviesData();
    })
  }

  getPlanetName(homeword: string){
    this.planetService.getAllPlanetData(homeword).subscribe(data =>{
      this.selectedPlanetData = data.name
    })
  }
}


