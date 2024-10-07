import { Component, Input, EventEmitter, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-element',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  templateUrl: './element.component.html',
  styleUrl: './element.component.css'
})
export class ElementComponent {
  
  @Input() idNumber!:string;
  @Input() title!:string;
  @Input() isChecked!:boolean;
  @Input() isDisabled!:boolean;
  @Output() onClick = new EventEmitter<string>();

  onClickEvent(idNumber:string)
  {
    this.onClick.emit(idNumber);
  }


}
