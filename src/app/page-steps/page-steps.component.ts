import {Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectionList} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';


import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';



import { levelData} from './data';
import { strategyData } from './data';
import { resourcesData } from './data';


interface Level {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-page-steps',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule,
    ReactiveFormsModule, 
    MatCheckboxModule, 
    JsonPipe,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCardModule,
    MatStepperModule
     

    
  ],
  templateUrl: './page-steps.component.html',
  styleUrl: './page-steps.component.css'
})

export class PageStepsComponent {

  gptModel = 'gpt-3.5-turbo-instruct';
  gptToken = '7|wYQN4VeSvbXGRvAqUapjiHZ2QMa1ZPBRXlZrNrAec8e4d32b'; // Token de usuário Laravel
  gptUrl = 'https://ilexis.net.br/gpt/public/api/openai-completion';

  constructor(private http: HttpClient) {}

  @ViewChild('pdata') listPData!: MatSelectionList;
  @ViewChild('tdata') listTData!: MatSelectionList;
  @ViewChild('ddata') listDData!: MatSelectionList;
  @ViewChild('sdata') listSData!: MatSelectionList;
  @ViewChild('rdata') listRData!: MatSelectionList;
  
  currentStepIndex:number = 0;
  selectedTabIndex:number = 0; 

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  stepFinal = false;

  strategies = strategyData.all;
  resources = resourcesData.all;

  selectedLevel: any;
  selectedLevelData:any;

  currentLevel:string='';
  currentObjectives:string='';
  currentStrategies:string='';
  currentFinalTask:string='';
  currentResources:string='';
  currentPlanType:string='';
  currentAbilities:string='';
  currentProcedures:string='';
  currentEvaluation:string='';
  currentHtml:string='';

  pData:any;
  tData:any;
  dData:any;
  sData:any;
  rData:any;

  levels: Level[] = [
    {value: '1', viewValue: '1º ANO DO ENSINO FUNDAMENTAL'},
    {value: '2', viewValue: '2º ANO DO ENSINO FUNDAMENTAL'},
    {value: '3', viewValue: '3º ANO DO ENSINO FUNDAMENTAL'},
    {value: '4', viewValue: '4º ANO DO ENSINO FUNDAMENTAL'},
    {value: '5', viewValue: '5º ANO DO ENSINO FUNDAMENTAL'},
    {value: '6', viewValue: '6º ANO DO ENSINO FUNDAMENTAL'},
    {value: '7', viewValue: '7º ANO DO ENSINO FUNDAMENTAL'},
    {value: '8', viewValue: '8º ANO DO ENSINO FUNDAMENTAL'},
    {value: '9', viewValue: '9º ANO DO ENSINO FUNDAMENTAL'},
  ];

  panelOpenState = false;

  showSpinner = false;

  finalTask:any;
  abilities: any;
  procedures:any;
  evaluation:any;

  planType = new FormControl('1');

  async askGPT(prompt:string, max_tokens:string):Promise<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.gptToken}`,
    });
    const payload = {
      "model": this.gptModel,
      "max_tokens": max_tokens,
      "prompt": prompt
    }
    try {
        const response = await firstValueFrom(this.http.post(this.gptUrl, payload, { headers: headers }));
        const text:string = (response as any[])[0].text;
        return text.trim() ;
      } catch (error) {
        console.error('Erro ao perguntar ao GPT:', error);
        return "Erro ao perguntar ao GPT."; 
      }
  }

  showProgress(){
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
    this.stepFinal = false;
    this.showSpinner = true;
  }

  hideProgress(){
    this.showSpinner = false;
  }
  
  onSelectionLevelChange(event: MatSelectChange) {

    switch(event.value)
    {
      case "1":
        this.selectedLevelData = levelData.ano1;
        this.currentLevel = '1º ano do Ensino Fundamental';
        break;
      case "2":
        this.selectedLevelData = levelData.ano2;
        this.currentLevel = '2º ano do Ensino Fundamental';
        break;
      case "3":
        this.selectedLevelData = levelData.ano3;
        this.currentLevel = '3º ano do Ensino Fundamental';
        break;
      case "4":
        this.selectedLevelData = levelData.ano4;
        this.currentLevel = '4º ano do Ensino Fundamental';
        break;
      case "5":
        this.selectedLevelData = levelData.ano5;
        this.currentLevel = '5º ano do Ensino Fundamental';
        break;
      case "6":
        this.selectedLevelData = levelData.ano6;
        this.currentLevel = '6º ano do Ensino Fundamental';
        break;
      case "7":
        this.selectedLevelData = levelData.ano7;
        this.currentLevel = '7º ano do Ensino Fundamental';
        break;
      case "8":
        this.selectedLevelData = levelData.ano8;
        this.currentLevel = '8º ano do Ensino Fundamental';
        break;
      case "9":
        this.selectedLevelData = levelData.ano9;
        this.currentLevel = '9º ano do Ensino Fundamental';
        break;
    }

    this.pData = [];
    for (const key in this.selectedLevelData) {
      const item = this.selectedLevelData[key];
      if (item.eixo === 'PROGRAMAÇÃO') {
          this.pData.push(item);
      }
    }

    this.tData = [];
    for (const key in this.selectedLevelData) {
      const item = this.selectedLevelData[key];
      if (item.eixo === 'TECNOLOGIAS DA INFORMAÇÃO E COMUNICAÇÃO') {
          this.tData.push(item);
      }
    }

    this.dData = [];
    for (const key in this.selectedLevelData) {
      const item = this.selectedLevelData[key];
      if (item.eixo === 'LETRAMENTO DIGITAL') {
          this.dData.push(item);
      }
    }

   
  
  }

   makePromptStep1():string {
    // Acessa os itens selecionados de cada lista
    const objetivesPData = this.listPData.selectedOptions.selected.map(s => s.value);
    const objetivesTData = this.listTData.selectedOptions.selected.map(s => s.value);
    const objetivesDData = this.listDData.selectedOptions.selected.map(s => s.value);

    const strategiesData = this.listSData.selectedOptions.selected.map(s => s.value);

    // Concatena todos os itens em um único array
    const allObjectives = [...objetivesPData, ...objetivesTData, ...objetivesDData];
    // Junta todos em uma única string
    let objectives = ''; // Inicializa a variável como uma string vazia
    for (const key in allObjectives) {
      const item = allObjectives[key];
      // Concatena o valor com um espaço, vírgula, ou qualquer outro separador desejado
      objectives += item.objetivo + '; '; // Adiciona um ponto e vírgula e um espaço como separadores
    }
    this.currentObjectives = objectives;
    // Concatena estratégias
    let strats = '';
    for (const key in strategiesData){
      const item = strategiesData[key];
      strats += item.strategy + ';';
    }
    this.currentStrategies = strats;
    // Cria o prompt
    let prompt = '';
    prompt += "Considerando o componente de Tecnologias para Aprendizagem.";
    prompt += "Considerando uma turma de " + this.currentLevel + ", de escola municipal de São Paulo.";
    prompt += "Considerando que a turma de 35 alunos tem aulas em um laboratório de informática com 20 computadores.";
    prompt += "Sugira uma opção de  tarefa final com base nos seguintes objetivos de aprendizagem: " + objectives + " e nas seguites estratégias de ensino: " + strats;
    prompt += "Retorne a descrição da tarefa final ou produto final de maneira breve e concisa (máx. 300 caracteres), de forma que um professor entenda o que os alunos farão e possa perceber os objetivos de aprendizagem nos procedimentos.";
    return prompt;
  }


  makePromptStep2():string {
    const resourcesData = this.listRData.selectedOptions.selected.map(s => s.value);
     // Concatena recursos
     let resources = '';
     for (const key in resourcesData){
       const item = resourcesData[key];
       resources += item.resource + ';';
     }
     this.currentResources = resources;
     // Tarefa final
     this.currentFinalTask = this.finalTask;
    // Faz o prompt
    let prompt = '';
    prompt += "Considerando o componente de Tecnologias para Aprendizagem.";
    prompt += "Considerando uma turma de " + this.currentLevel + ", de escola municipal de São Paulo.";
    prompt += "Considerando que a turma de 35 alunos tem aulas em um laboratório de informática com 20 computadores.";
    prompt += "Considerendo os seguintes objetivos: " + this.currentObjectives + " e as seguintes estratégias de ensino: " + this.currentStrategies;
    prompt += "Considerando os seguintes recursos possíveis de utilizar: " + this.currentResources;
    prompt += "Considerando a seguinte tarefa final dos estudantes: " + this.currentFinalTask;
    prompt += "Liste em tópicos o que os estudantes terão aprendido ao final da realização da tarefa.";
    return prompt;
  }

  makePromptStep3():string {
    this.currentAbilities = this.abilities;
    let prompt = '';
    prompt += "Considerando o componente de Tecnologias para Aprendizagem.";
    prompt += "Considerando uma turma de " + this.currentLevel + ", de escola municipal de São Paulo.";
    prompt += "Considerando que a turma de 35 alunos tem aulas em um laboratório de informática com 20 computadores.";
    prompt += "Considerendo os seguintes objetivos: " + this.currentObjectives + " e as seguintes estratégias de ensino: " + this.currentStrategies;
    prompt += "Considerando os seguintes recursos possíveis de utilizar: " + this.currentResources;
    prompt += "Considerando a seguinte tarefa final dos estudantes: " + this.currentFinalTask;
    prompt += "Considerando as habilidades e conhecimentos que os estudantes terão aprendido ao final da realização da tarefa: " + this.currentAbilities;
    prompt += "Liste, em passos numerados, um em cada linha, os procedimentos para realização da " + this.currentPlanType + " até o término da tarefa final.";
    return prompt;
  return '';
  }

  makePromptStep4():string {
    this.currentProcedures = this.procedures;
    let prompt = '';
    prompt += "Considerando o componente de Tecnologias para Aprendizagem.";
    prompt += "Considerando uma turma de " + this.currentLevel + ", de escola municipal de São Paulo.";
    prompt += "Considerando que a turma de 35 alunos tem aulas em um laboratório de informática com 20 computadores.";
    prompt += "Considerendo os seguintes objetivos: " + this.currentObjectives + " e as seguintes estratégias de ensino: " + this.currentStrategies;
    prompt += "Considerando os seguintes recursos possíveis de utilizar: " + this.currentResources;
    prompt += "Considerando a seguinte tarefa final dos estudantes: " + this.currentFinalTask;
    prompt += "Considerando as habilidades e conhecimentos que os estudantes terão aprendido ao final da realização da tarefa: " + this.currentAbilities;
    prompt += "Considerando os procedimentos para realização da " + this.currentPlanType + " até o término da tarefa final: " + this.currentProcedures;
    prompt += "Liste, um em cada linha, sem numerar, os procedimentos de avaliação para os procedimentos apresentados.";
    return prompt;
  return '';
  }

  makeHtml():string {
    this.currentProcedures = this.procedures;
    this.currentEvaluation = this.evaluation;
   
    let html = '';
    html += `<!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>`;
    html+= "<h1>Roteiro de Aprendizagem</h1>";
    html+= "<p><b>Ano:</b> " + this.currentLevel + "</p>";
    html+= "<p><b>Objetivos:</b> <br>" + this.currentObjectives.replace(/\r?\n/g, "<br>") +"</p>";
    html+= "<p><b>Tarefa final:</b> <br>" + this.currentFinalTask.replace(/\r?\n/g, "<br>") +"</p>";
    html+= "<p><b>Habilidades:</b> <br>" + this.currentAbilities.replace(/\r?\n/g, "<br>") +"</p>";
    html+= "<p><b>Estratégias:</b> <br>" + this.currentStrategies.replaceAll(';', ";<br> ") +"</p>";
    html+= "<p><b>Procedimentos:</b> <br>" + this.currentProcedures.replace(/\r?\n/g, "<br>") +"</p>";
    html+= "<p><b>Recursos:</b> <br>" + this.currentResources.replaceAll(';', ";<br> ") +"</p>";
    html+= "<p><b>Avaliação:</b> <br>" + this.currentEvaluation.replace(/\r?\n/g, "<br>") +"</p>";
    html+= `</body>
    </html>`
    return html;
  }

  async gotoStep2(){
    this.showProgress();
    const prompt = this.makePromptStep1();
    const answer = await this.askGPT(prompt, '300');
    this.finalTask = answer.replace('Tarefa final:', '').trim();
    this.hideProgress();
    this.step2 = true;
    this.currentStepIndex = 1;

  }

  async gotoStep3(){
    this.showProgress();
    const prompt = this.makePromptStep2();
    const answer = await this.askGPT(prompt, '300');
    this.abilities = answer;
    this.hideProgress();
    this.step3 = true;
    this.currentStepIndex = 2;
  }

  async gotoStep4(){
    this.showProgress();
    const prompt = this.makePromptStep3();
    const answer = await this.askGPT(prompt, '500');
    this.procedures = answer;
    this.hideProgress();
    this.step4 = true;
    this.currentStepIndex = 3;
  }

  async gotoStep5(){
    this.showProgress();
    const prompt = this.makePromptStep4();
    const answer = await this.askGPT(prompt, '300');
    this.evaluation = answer;
    this.hideProgress();
    this.step5 = true;
    this.currentStepIndex = 4;
  }

  async gotoFinal(){
    this.showProgress();
    this.currentHtml = this.makeHtml();
    this.hideProgress();
    this.stepFinal = true;
    this.currentStepIndex = 5;
  } 

  async downloadDoc(){
    asBlob( this.currentHtml).then((blobOrBuffer) => {
      if (blobOrBuffer instanceof Blob) {
        saveAs(blobOrBuffer, 'roteiro.docx');
      } else {
        console.error('Expected a Blob, but received a Buffer.');
      }
      //alert('Done!');
    }).catch(error => {
      console.error("Error in creating docx file:", error);
    });
  }


  reloadPage() {
    location.reload();
}

  backtoStep1(){
    this.showProgress();
    this.hideProgress();
    this.step1 = true;
    this.currentStepIndex = 0;
  }
  backtoStep2(){
    this.showProgress();
    this.hideProgress();
    this.step2 = true;
    this.currentStepIndex = 1;
  }
  backtoStep3(){
    this.showProgress();
    this.hideProgress();
    this.step3 = true;
    this.currentStepIndex = 2;
  }
  backtoStep4(){
    this.showProgress();
    this.hideProgress();
    this.step4 = true;
    this.currentStepIndex = 3;
  }
 
 
 
  

}
