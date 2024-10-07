import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-examples-apis',
  standalone: true,
  imports: [MatButtonModule,HttpClientModule],
  templateUrl: './examples-apis.component.html',
  styleUrl: './examples-apis.component.css',
  providers: [ ApisService]
})
export class ExamplesApisComponent {

  constructor(private http: ApisService) { }

  async getHero(){

    const url = "https://63afc83b649c73f572c23e57.mockapi.io/api/heroes";

    this.http.apiGet(url).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });

    try {
      const data = await this.http.apiGet(url);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async postHero(){
    const hero = {
      "name": "Flash",
      "color": "red"
    }
    const url = "https://63afc83b649c73f572c23e57.mockapi.io/api/heroes";
    this.http.apiPost(url, hero).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  async patchHero(){
    const hero = {
      "name": "Superman",
    }
    const url = "https://63afc83b649c73f572c23e57.mockapi.io/api/heroes/3";
    this.http.apiPatch(url, hero).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }


}
