import { Component, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ElementComponent } from '../element/element.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApisService } from '../apis.service';
import { CardAgentComponent } from '../card-agent/card-agent.component';
import { CardTaskComponent } from '../card-task/card-task.component';
import { CardCrewComponent } from '../card-crew/card-crew.component';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';


import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

export interface Agent {
  id: number;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  delegation: boolean;
  tools: string[];
  allTools: string[];
  order:number;
  isCollapsed:boolean;
}

export interface Task {
  id: number;
  name: string;
  agent: string;
  description: string;
  expectedOutput: string;
  context: string;
  tasks: string[];
  async: boolean
  human: boolean;
  tools: string[];
  allTools: string[];
  allAgents: string[];
  allTasks: string[];
  order:number;
  isCollapsed:boolean;
}

export interface Crew{
  id: number;
  name: string;
  agents: string[];
  tasks: string[];
  planning:boolean,
  memory:boolean;
  inputs: string;
  process: string;
  allAgents: string[];
  allTasks: string[];
  order:number;
  isCollapsed:boolean;
}



@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    ToolbarComponent,
    FooterComponent,
    ElementComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    CardAgentComponent,
    MatListModule,
    MatBottomSheetModule,
    InputDialogComponent,
    CardTaskComponent,
    CardCrewComponent,

],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css',
  providers: [ApisService]
})
export class PageHomeComponent {

  constructor( public router: Router, private http: ApisService, private _bottomSheet: MatBottomSheet,  private dialog: MatDialog) { }

  allTools: string[] = ['Google', 'LeitorDeArquivo', 'LeitorDePasta'];

  agents:Agent[]=[];
  tasks:Task[]=[];
  crews:Crew[]=[];

  @ViewChild('cardCrewComponent') cardCrewComponent!: CardCrewComponent;
  @ViewChild('cardTaskComponent') cardTaskComponent!: CardTaskComponent;


  // Método para atualizar a fonte dos chips
  updateChipsData() {
    const newAgents = this.getAgents() ;
    const newTasks = this.getTasks();
    this.cardCrewComponent.updateChipsSource(newAgents, newTasks);
    this.cardTaskComponent.updateChipsSource(newAgents, newTasks);
  }

  ngOnInit() {

    const ag1 = {
      id: this.agents.length + 1,
      name: 'Tradutor',
      role: 'Tradutor de textos',
      goal: 'Traduzir textos do inglês para português',
      backstory: 'Experiente tradutor de textos técnicos',
      delegation: true,
      tools: [],
      allTools: this.allTools,
      order:1,
      isCollapsed:true
    }

    const  ag2 = {
      id: this.agents.length + 1,
      name: 'Escritor',
      role: 'Escritor de textos',
      goal: 'Escrever um capítulo de romance',
      backstory: 'Experiente escritor de romances sobre amor',
      delegation: false,
      tools: [],
      allTools: this.allTools,
      order:2,
      isCollapsed:true
    }

    this.agents.push(ag1);
    this.agents.push(ag2);

    const  task1 = {
      id: this.tasks.length + 1,
      name: 'Escrita de livro',
      agent: 'Escritor',
      agents: [],
      description: 'Realizar a escrita de um capítulo de romance',
      expectedOutput: 'Um parágrafo',
      context:'',
      tasks: [],
      async: false,
      human: false,
      tools: [],
      allAgents: this.getAgents(),
      allTasks: this.getTasks(),
      allTools: this.allTools,
      order:1,
      isCollapsed:true
    }

    this.tasks.push(task1);

    const  crew1 = {
      id: this.crews.length + 1,
      name: 'Minha Equipe',
      agents: [],
      tasks: [],
      planning: false,
      memory: false,
      process: 'sequencial',
      inputs: '',
      allAgents: this.getAgents(),
      allTasks: this.getTasks(),
      allTools: this.allTools,
      order:1,
      isCollapsed:true

    }

    this.crews.push(crew1);


  }

  normalizeToCamelCase(input: string): string {
    // Function to remove accents
    const removeAccents = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Function to convert to camelCase
    const toCamelCase = (str: string) =>
      str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, ""); // Remove spaces

    // Normalize the input by removing accents and trimming spaces
    const normalized = removeAccents(input.trim());

    // Convert to camelCase
    const camelCase = toCamelCase(normalized);

    // Remove any non-alphanumeric characters that are not underscores or dollar signs
    const validVariableName = camelCase.replace(/[^a-zA-Z0-9_$]/g, "");

    return validVariableName;
  }

  openAgentDialog(): void {
        const dialogRef = this.dialog.open(InputDialogComponent, {
          width: '344px',
          height: '224px',
          data: {
            title: 'Adicionar agente...',
            label: 'Nome do agente',
            type: 'agent'
           }
        });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.trim() !== '') {
        //console.log('Dados recebidos da Caixa de Diálogo:', result);
        // Aqui você pode tratar os dados recebidos, por exemplo, adicionar à lista de agentes
        const total = this.agents.length + 1;
        this.agents.push({
          id: this.agents.length + 1,
          name: result,
          role: '',
          goal: '',
          backstory: '',
          delegation: false,
          tools: [],
          allTools: this.allTools,
          order: total,
          isCollapsed: true,
        });
        this.updateChipsData();
      }
    });
  }

  openTaskDialog(): void {

    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '344px',
      height: '224px',
      data: {
        title: 'Adicionar tarefa...',
        label: 'Nome da tarefa',
        type: 'task'
       }
    });
dialogRef.afterClosed().subscribe(result => {
  if (result !== undefined && result.trim() !== '') {
    //console.log('Dados recebidos da Caixa de Diálogo:', result);
    // Aqui você pode tratar os dados recebidos, por exemplo, adicionar à lista de agentes
    const total = this.tasks.length + 1;
    this.tasks.push({
      id: this.tasks.length + 1,
      name: result,
      agent: '',
      description: '',
      expectedOutput: '',
      context: '',
      tasks: [],
      async:false,
      human: false,
      tools: [],
      allAgents: this.getAgents(),
      allTasks: this.getTasks(),
      allTools: this.allTools,
      order:total,
      isCollapsed:true
    });
    this.updateChipsData();
  }
});

}

openCrewDialog(): void {
  const dialogRef = this.dialog.open(InputDialogComponent, {
    width: '344px',
    height: '224px',
    data: {
      title: 'Adicionar equipe...',
      label: 'Nome da equipe',
      type: 'crew'
     }
  });
dialogRef.afterClosed().subscribe(result => {
if (result !== undefined && result.trim() !== '') {
  const total = this.crews.length + 1;
  this.crews.push({
    id: this.crews.length + 1,
    name: result,
    agents: [],
    tasks: [],
    planning: false,
    memory: false,
    inputs: '',
    process: 'sequencial',
    allAgents: this.getAgents(),
    allTasks: this.getTasks(),
    order:total,
    isCollapsed:true

  });
  this.updateChipsData();
}
});
}

getAgents(){
  let allAgents = [];
  for (const agent of this.agents){
    allAgents.push(this.normalizeToCamelCase(agent.name));
  }
  return allAgents;
}

getTasks(){
  let allTasks = [];
  for (const task of this.tasks){
    allTasks.push(this.normalizeToCamelCase(task.name));
  }
  return allTasks;
}



  handleAgentDelete(agent: Agent) {
    this.agents = this.agents.filter(a => a.id !== agent.id);
    this.updateChipsData();
  }

  handleTaskDelete(task: Task) {
    this.tasks = this.tasks.filter(a => a.id !== task.id);
    this.updateChipsData();
  }

  handleCrewDelete(crew: Crew) {
    this.crews = this.crews.filter(a => a.id !== crew.id);
    this.updateChipsData();
  }



  handleAgentUp(agent: Agent) {
  // Encontrar o índice do agente na lista de agentes
  const index = this.agents.findIndex(a => a === agent);
  // Se o agente já estiver na primeira posição, não faz nada
  if (index <= 0) {
    return;
  }
  // Troca o agente com o anterior
  const temp = this.agents[index - 1];
  this.agents[index - 1] = agent;
  this.agents[index] = temp;
  // Atualizar a ordem dos agentes (opcional, depende de como a ordem é gerenciada)
  this.agents[index - 1].order -= 1;
  this.agents[index].order += 1;

  }

  handleTaskUp(task: Task) {
    // Encontrar o índice do agente na lista de agentes
    const index = this.tasks.findIndex(a => a === task);
    // Se o agente já estiver na primeira posição, não faz nada
    if (index <= 0) {
      return;
    }
    // Troca o agente com o anterior
    const temp = this.tasks[index - 1];
    this.tasks[index - 1] = task;
    this.tasks[index] = temp;
    // Atualizar a ordem dos agentes (opcional, depende de como a ordem é gerenciada)
    this.tasks[index - 1].order -= 1;
    this.tasks[index].order += 1;

    }

    handleCrewUp(crew: Crew) {
      const index = this.crews.findIndex(a => a === crew);
      if (index <= 0) {
        return;
      }
      const temp = this.crews[index - 1];
      this.crews[index - 1] = crew;
      this.crews[index] = temp;
      this.crews[index - 1].order -= 1;
      this.crews[index].order += 1;
      }

  handleAgentDown(agent: Agent) {
    // Encontrar o índice do agente na lista de agentes
  const index = this.agents.findIndex(a => a === agent);
  // Se o agente já estiver na última posição, não faz nada
  if (index < 0 || index >= this.agents.length - 1) {
    return;
  }
  // Troca o agente com o próximo
  const temp = this.agents[index + 1];
  this.agents[index + 1] = agent;
  this.agents[index] = temp;
  // Atualizar a ordem dos agentes (opcional, depende de como a ordem é gerenciada)
  this.agents[index + 1].order += 1;
  this.agents[index].order -= 1;
  }

  handleTaskDown(task: Task) {
    // Encontrar o índice do agente na lista de agentes
  const index = this.tasks.findIndex(a => a === task);
  // Se o agente já estiver na última posição, não faz nada
  if (index < 0 || index >= this.tasks.length - 1) {
    return;
  }
  // Troca o agente com o próximo
  const temp = this.tasks[index + 1];
  this.tasks[index + 1] = task;
  this.tasks[index] = temp;
  // Atualizar a ordem dos agentes (opcional, depende de como a ordem é gerenciada)
  this.tasks[index + 1].order += 1;
  this.tasks[index].order -= 1;
  }

  handleCrewDown(crew: Crew) {
  const index = this.crews.findIndex(a => a === crew);
  if (index < 0 || index >= this.crews.length - 1) {
    return;
  }
  const temp = this.crews[index + 1];
  this.crews[index + 1] = crew;
  this.crews[index] = temp;
  this.crews[index + 1].order += 1;
  this.crews[index].order -= 1;
  }


  createAgentsCode(){
    const ident = "    ";
    let arr = [];
    for (const agent of this.agents){
      arr.push(this.normalizeToCamelCase(agent.name) + ' = Agent(');
      arr.push(ident + "role='" + agent.role + "',");
      arr.push(ident + "goal='" + agent.goal + "',");
      arr.push(ident + "backstory='" + agent.backstory + "',");
      if (agent.tools.length != 0)
      {
        let tools = "";
        tools+=ident + "tools=[";
        tools+= agent.tools.join(', ');
        tools+="],";
        arr.push(tools);
      }

      if (agent.delegation === true)
      {
        arr.push(ident + "allow_delegation=True,");
      }else{
        arr.push(ident + "allow_delegation=False,");
      }
      arr.push(ident + 'verbose=True')
      arr.push(")")
      arr.push("")
    }
    let result = '# Cria agentes\n\n' + arr.join('\n') + '\n';
    return result;

  }

  createTasksCode(){
    const ident = "    ";
    let arr = [];
    for (const task of this.tasks){
      arr.push(this.normalizeToCamelCase(task.name) + ' = Task(');
      arr.push(ident + "description='" + task.description + "',");
      arr.push(ident + "expected_output='" + task.expectedOutput + "',");
      arr.push(ident + "agent='" + task.agent + "',");
      if (task.tools.length != 0)
      {
        let tools = "";
        tools+=ident + "tools=[";
        tools+= task.tools.join(', ');
        tools+="],";
        arr.push(tools);
      }

      if (task.tasks.length != 0)
        {
          let tasks = "";
          tasks += "context=["
          for (const t of task.tasks){
            tasks+= "'" + t + "',";
          }
          tasks+="],";
          tasks = tasks.replace(',]', ']');
          arr.push( ident+tasks);
        }else{
          arr.push(ident+ 'context=[]');
        }


      if (task.async === true)
        {
          arr.push(ident + "async_execution=True,");
        }else{
          arr.push(ident + "async_execution=False,");
        }

      if (task.human === true)
      {
        arr.push(ident + "human_input=True,");
      }else{
        arr.push(ident + "human_input=False,");
      }
      arr.push(")")
      arr.push("")
    }
    let result = '# Cria tarefas\n\n' + arr.join('\n') + '\n';
    return result;

  }

  createCrewsCode(){
    const ident = "    ";
    let arr = [];

    arr.push('equipe = Crew(')




    arr.push(')');
    let result = '# Define a equipe\n\n' + arr.join('\n') + '\n';
    return result;
  }



   copyToClipboard() {
    this.updateChipsData();
    const agentsCode = this.createAgentsCode();
    const tasksCode = this.createTasksCode();
    const text = agentsCode + tasksCode
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Texto copiado para a área de transferência');
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  }








}
