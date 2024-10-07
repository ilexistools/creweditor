import { Component, Input, Output, EventEmitter , OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';




@Component({
  selector: 'app-card-agent',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatCheckboxModule,
    MatChipsModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './card-agent.component.html',
  styleUrl: './card-agent.component.css'
})
export class CardAgentComponent  implements OnInit{

  @Input() data: any;
  @Output() deleteAgent = new EventEmitter<any>(); 
  @Output() goUp = new EventEmitter<any>(); 
  @Output() goDown= new EventEmitter<any>(); 
  
  isCollapsed: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  toolCtrl = new FormControl('');
  filteredTools: Observable<string[]>;
  //tools: string[] =[];
  //allTools: string[] = ['Google', 'LeitorDeArquivo', 'LeitorDePasta'];
  allTools: string[] = [];
  

  @ViewChild('toolInput') toolInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredTools = this.toolCtrl.valueChanges.pipe(
      startWith(null),
      map((tool: string | null) => (tool ? this._filter(tool) : this.allTools.slice())),
    );
  }

  ngOnInit() {
    if (this.data && this.data.isCollapsed){
      this.isCollapsed = this.data.isCollapsed;
    }

    if (this.data && this.data.allTools) {
      this.allTools = this.data.allTools;
      // Reatribuindo filteredTools após definir allTools
      this.filteredTools = this.toolCtrl.valueChanges.pipe(
        startWith(null),
        map((tool: string | null) => (tool ? this._filter(tool) : this.allTools.slice())),
      );
    }
  }
  
   // Método para emitir o evento de delete
   onDelete() {
    this.deleteAgent.emit(this.data); // Você pode emitir apenas o ID ou qualquer outra informação relevante
  }

  onUp() {
    this.goUp.emit(this.data);
  }
  
  onDown() {
    this.goDown.emit(this.data);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    // Add tool if it is not already in the list
    if (value && !this.data.tools.includes(value)) {
      //this.tools.push(value);
      this.data.tools.push(value);
    }
  
    // Clear the input value
    event.chipInput!.clear();
  
    this.toolCtrl.setValue(null);
  }

  remove(tool: string): void {
   // const index = this.tools.indexOf(tool);
   const index = this.data.tools.indexOf(tool);
    if (index >= 0) {
      //this.tools.splice(index, 1);
      this.data.tools.splice(index, 1);

      this.announcer.announce(`Removed ${tool}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.data.tools.includes(event.option.viewValue)) {
      this.data.tools.push(event.option.viewValue);
    }
    this.toolInput!.nativeElement.value = '';
    this.toolCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTools.filter(tool => tool.toLowerCase().includes(filterValue));
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.data) {
      this.data.isCollapsed = this.isCollapsed;
    }
    //console.log("Collapsed status:", this.isCollapsed);
  }

  

}
