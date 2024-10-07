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
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-card-task',
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
    MatSelectModule
  ],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent implements OnInit {

  @Input() data: any;
  @Output() deleteTask = new EventEmitter<any>(); 
  @Output() goUp = new EventEmitter<any>(); 
  @Output() goDown= new EventEmitter<any>(); 
  
  isCollapsed: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  toolCtrl = new FormControl('');
  filteredTools: Observable<string[]>;
  allTools: string[] = [];

  agentCtrl = new FormControl('');
  filteredAgents: Observable<string[]>;
  allAgents: string[] = [];

  taskCtrl = new FormControl('');
  filteredTasks: Observable<string[]>;
  allTasks: string[] = [];

  @ViewChild('agentInput') agentInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('toolInput') toolInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredTools = this.toolCtrl.valueChanges.pipe(
      startWith(null),
      map((tool: string | null) => tool ? this._filter(tool) : this.allTools.slice())
    );

    this.filteredTasks = this.taskCtrl.valueChanges.pipe(
      startWith(''),
      map((task: string | null) => task ? this._filterTask(task) : this.allTasks.slice())
    );
    
    // Inicializa o filtro de agentes
    this.filteredAgents = this.agentCtrl.valueChanges.pipe(
      startWith(''),
      map((agent: string | null) => (agent ? this._filterAgent(agent) : this.allAgents.slice()))
    );
  }

  ngOnInit() {
    if (this.data) {
      this.isCollapsed = !!this.data.isCollapsed;
      this.allTools = this.data.allTools || [];
      this.allTasks = this.data.allTasks || [];

      this.filteredTools = this.toolCtrl.valueChanges.pipe(
        startWith(null),
        map((tool: string | null) => tool ? this._filter(tool) : this.allTools.slice())
      );

      if (this.data && this.data.allTasks) {
        this.allTasks = this.data.allTasks;
        this.filteredTasks = this.taskCtrl.valueChanges.pipe(
          startWith(''),
          map((task: string | null) => (task ? this._filterTask(task) : this.allTasks.slice())),
        );
      }

      if (this.data && this.data.allAgents) {
        this.allAgents = this.data.allAgents;
        this.filteredAgents = this.agentCtrl.valueChanges.pipe(
          startWith(''),
          map((agent: string | null) => (agent ? this._filterAgent(agent) : this.allAgents.slice())),
        );
      }

   
   

    }
  }

  

 
  update(){
    
    this.filteredTasks = this.taskCtrl.valueChanges.pipe(
      startWith(''),
      map((task: string | null) => task ? this._filterTask(task) : this.allTasks.slice())
    );
  }

 
  onDelete() {
    this.deleteTask.emit(this.data);
  }

  onUp() {
    this.goUp.emit(this.data);
  }
  
  onDown() {
    this.goDown.emit(this.data);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.data.tools.includes(value)) {
      this.data.tools.push(value);
    }
    event.chipInput!.clear();
    this.toolCtrl.setValue(null);
  }

  remove(tool: string): void {
    const index = this.data.tools.indexOf(tool);
    if (index >= 0) {
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

  addTask(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.data.tasks.includes(value)) {
      this.data.tasks.push(value);
    }
    event.chipInput!.clear();
    this.taskCtrl.setValue(null);
  }

  removeTask(task: string): void {
    const index = this.data.tasks.indexOf(task);
    if (index >= 0) {
      this.data.tasks.splice(index, 1);
      this.announcer.announce(`Removed ${task}`);
    }
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

  private _filterTask(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTasks.filter(task => task.toLowerCase().includes(filterValue));
  }


  addAgent(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.data.agents.includes(value)) {
      this.data.agents.push(value);
    }
    event.chipInput!.clear();
    this.agentCtrl.setValue(null);
  }

  removeAgent(agent: string): void {
    const index = this.data.agents.indexOf(agent);
    if (index >= 0) {
      this.data.agents.splice(index, 1);
      this.announcer.announce(`Removed ${agent}`);
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

  private _filterAgent(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAgents.filter(agent => agent.toLowerCase().includes(filterValue));
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
