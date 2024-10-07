import { Component } from '@angular/core';
import { GptService } from '../gpt.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-examples-gpt',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './examples-gpt.component.html',
  styleUrl: './examples-gpt.component.css',
  providers: [GptService]
})
export class ExamplesGptComponent {

  constructor( private gpt: GptService) { }

  async askGpt(){
    this.gpt.getMessage().then(data => {
      console.log(data);
      console.log('Done!');
    }).catch(error => {
      console.error('Error fetching data:', error);
    });



  }


}
