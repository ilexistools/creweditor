import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-card-crew',
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
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatMenuModule,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './card-crew.component.html',
  styleUrls: ['./card-crew.component.css']
})
export class CardCrewComponent implements OnInit {

  @Input() data: any;
  @Output() deleteCrew = new EventEmitter<any>();
  @Output() goUp = new EventEmitter<any>();
  @Output() goDown = new EventEmitter<any>();
  @Output() copyCrew =  new EventEmitter<any>();

  isCollapsed: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  agentCtrl = new FormControl('');
  filteredAgents: Observable<string[]>;
  allAgents: string[] = [];

  taskCtrl = new FormControl('');
  filteredTasks: Observable<string[]>;
  allTasks: string[] = [];

  @ViewChild('agentInput') agentInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredAgents = this.agentCtrl.valueChanges.pipe(
      startWith(''),
      map((agent: string | null) => (agent ? this._filterAgent(agent) : this.allAgents.slice())),
    );

    this.filteredTasks = this.taskCtrl.valueChanges.pipe(
      startWith(''),
      map((task: string | null) => (task ? this._filterTask(task) : this.allTasks.slice())),
    );
  }



  // Método para validar o JSON
  jsonError: boolean = false;




  validateJson(): void {
    if (this.data.inputs.length!=0)
    {
      try {
        JSON.parse(this.data.inputs);  // Tenta fazer o parse do JSON
        this.jsonError = false;  // Se for válido, remove o erro
      } catch (e) {
        this.jsonError = true;  // Se houver erro, exibe a mensagem de erro
      }
    }else{
      this.jsonError = false;
    }

  }





  ngOnInit() {
    if (this.data && this.data.isCollapsed) {
      this.isCollapsed = this.data.isCollapsed;
    }

    if (this.data && this.data.allAgents) {
      this.allAgents = this.data.allAgents;
      this.filteredAgents = this.agentCtrl.valueChanges.pipe(
        startWith(''),
        map((agent: string | null) => (agent ? this._filterAgent(agent) : this.allAgents.slice())),
      );
    }

    if (this.data && this.data.allTasks) {
      this.allTasks = this.data.allTasks;
      this.filteredTasks = this.taskCtrl.valueChanges.pipe(
        startWith(''),
        map((task: string | null) => (task ? this._filterTask(task) : this.allTasks.slice())),
      );
    }
  }

  // Método para emitir o evento de delete
  onDelete() {
    this.deleteCrew.emit(this.data);
  }

  onUp() {
    this.goUp.emit(this.data);
  }

  onDown() {
    this.goDown.emit(this.data);
  }

  onCopyCrew(){
    this.copyCrew.emit(this.data);
  }



  addAgent(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.data.agents.includes(value)) {
      this.data.agents.push(value);
    }
    event.chipInput!.clear();
    this.agentCtrl.setValue(null);
  }

  addTask(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.data.tasks.includes(value)) {
      this.data.tasks.push(value);
    }
    event.chipInput!.clear();
    this.taskCtrl.setValue(null);
  }

  removeAgent(agent: string): void {
    const index = this.data.agents.indexOf(agent);
    if (index >= 0) {
      this.data.agents.splice(index, 1);
      this.announcer.announce(`Removed ${agent}`);
    }
  }

  removeTask(task: string): void {
    const index = this.data.tasks.indexOf(task);
    if (index >= 0) {
      this.data.tasks.splice(index, 1);
      this.announcer.announce(`Removed ${task}`);
    }
  }

  selectedAgent(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (value && !this.data.agents.includes(value)) {
      this.data.agents.push(value);
    }

    if (this.agentInput) {
      this.agentInput.nativeElement.value = '';
    }
    this.agentCtrl.setValue(null);
  }

  selectedTask(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (value && !this.data.tasks.includes(value)) {
      this.data.tasks.push(value);
    }

    if (this.taskInput) {
      this.taskInput.nativeElement.value = '';
    }
    this.taskCtrl.setValue(null);
  }

  private _filterAgent(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAgents.filter(agent => agent.toLowerCase().includes(filterValue));
  }

  private _filterTask(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTasks.filter(task => task.toLowerCase().includes(filterValue));
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    if (this.data) {
      this.data.isCollapsed = this.isCollapsed;
    }
  }

  public updateChipsSource(newAgents: string[], newTasks: string[]): void {
    this.allAgents = newAgents;
    this.allTasks = newTasks;

    // Recalcula os observables filtrados
    this.filteredAgents = this.agentCtrl.valueChanges.pipe(
      startWith(''),
      map((agent: string | null) => (agent ? this._filterAgent(agent) : this.allAgents.slice())),
    );

    this.filteredTasks = this.taskCtrl.valueChanges.pipe(
      startWith(''),
      map((task: string | null) => (task ? this._filterTask(task) : this.allTasks.slice())),
    );
  }



}
