import { Component, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ElementComponent } from '../element/element.component';
import {matrix} from './matrix';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApisService } from '../apis.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-element-form',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, MatInputModule, MatRadioModule, 
    MatCardModule, CommonModule,  FormsModule, ElementComponent, MatStepper, ReactiveFormsModule,
    HttpClientModule,
   
  ],
  templateUrl: './element-form.component.html',
  styleUrl: './element-form.component.css',
  providers:[ApisService],
})


export class ElementFormComponent {
 
  currentEOL:string|undefined;

  args:any;

  showElements:boolean=true;
  showForm:boolean=false;
  showFinale:boolean=false;
  currentElement:any;

  agreeA:boolean=true;
  explainA:string="";
  suggestA:string="";
  titleA:string="";
  textA:string="";
  
  agreeB:boolean=true;
  explainB:string="";
  suggestB:string="";
  titleB:string="";
  textB:string="";

  agreeC:boolean=true;
  explainC:string="";
  suggestC:string="";
  titleC:string="";
  textC:string="";

  agreeD:boolean=true;
  explainD:string="";
  suggestD:string="";
  titleD:string="";
  textD:string="";

  agreeE:boolean=true;
  explainE:string="";
  suggestE:string="";
  titleE:string="";
  textE:string="";

  isChecked1:boolean=false;
  isChecked2:boolean=false;

  currentStepIndex: number = 0;
 
  constructor(public router: Router, private route: ActivatedRoute, private http:ApisService) {}
 

  goToForm(elementNumber:string){
    this.showForm = true; 
    this.showElements=false;
    this.showFinale=false;
    this.setElement(elementNumber);
    this.titleA = this.currentElement.element.texts.a.title;
    this.textA = this.currentElement.element.texts.a.text;
    this.titleB = this.currentElement.element.texts.b.title;
    this.textB = this.currentElement.element.texts.b.text;
    this.titleC = this.currentElement.element.texts.c.title;
    this.textC = this.currentElement.element.texts.c.text;
    this.titleD = this.currentElement.element.texts.d.title;
    this.textD = this.currentElement.element.texts.d.text;
    this.titleE = this.currentElement.element.texts.e.title;
    this.textE = this.currentElement.element.texts.e.text;
    
  }

  goToElements(){
    this.showForm = false;
    this.showElements=true;
    this.showFinale=false;
    this.updateElements();
    window.scrollTo(0, 0);
    
  }

  goToFinale(){
    this.showForm = false;
    this.showElements=false;
    this.showFinale=true;
  }

  setElement(elementNumber:string){
    switch(elementNumber)
    {
      case "1":
        this.currentElement = matrix.element1;
        
        break;
      case "2":
        this.currentElement = matrix.element2;
        break;
    }

  }

  goPreviousStep()
  {
    if (this.currentStepIndex!=0)
    {
      this.currentStepIndex --;
      console.log(this.currentStepIndex);
    }      
    
  }

  validateStepA()
  {
    let canContinue = true;
    if (this.agreeA == true)
    {
      canContinue = true;
    }else{
      if(this.explainA.length!=0 && this.suggestA.length!=0)
      {
        canContinue =  true;
      }else{
        canContinue =  false;
      }
    }
    if (canContinue==true)
    {
      this.currentStepIndex = 1;
    }
  }

  validateStepB()
  {
    let canContinue = true;
    if (this.agreeB == true)
    {
      canContinue = true;
    }else{
      if(this.explainB.length!=0 && this.suggestB.length!=0)
      {
        canContinue =  true;
      }else{
        canContinue =  false;
      }
    }
    if (canContinue==true)
    {
      this.currentStepIndex = 2;
    }
  }

  validateStepC()
  {
    let canContinue = true;
    if (this.agreeC == true)
    {
      canContinue = true;
    }else{
      if(this.explainC.length!=0 && this.suggestC.length!=0)
      {
        canContinue =  true;
      }else{
        canContinue =  false;
      }
    }
    if (canContinue==true)
    {
      this.currentStepIndex = 3;
    }
  }

  validateStepD()
  {
    let canContinue = true;
    if (this.agreeD == true)
    {
      canContinue = true;
    }else{
      if(this.explainD.length!=0 && this.suggestD.length!=0)
      {
        canContinue =  true;
      }else{
        canContinue =  false;
      }
    }
    if (canContinue==true)
    {
      this.currentStepIndex = 4;
    }
  }

  validateStepE()
  {
    let canContinue = true;
    if (this.agreeE == true)
    {
      canContinue = true;
    }else{
      if(this.explainE.length!=0 && this.suggestE.length!=0)
      {
        canContinue =  true;
      }else{
        canContinue =  false;
      }
    }
    if (canContinue==true)
    {
      this.goToFinale();
    }
  }

  goEdit(stepIndex:number)
  {
    this.showElements=false;
    this.showForm = true;
    this.showFinale = false;
    this.currentStepIndex = stepIndex;
  }

  goBackToEdit()
  {
    this.showElements = false;
    this.showForm = true;
    this.showFinale = false;
    this.currentStepIndex = 0;
  }

  translateBool(text:boolean)
  {
    if (text==true)
    {
      return "CONCORDO";
    }else{
      return "DISCORDO";
    }
  }

  normalize(text:string)
  {
    if (text.trim().length == 0)
    {
      return '***';
    }else{
      return text.trim();
    }
  }


  async sendInfo()
  {
    const data = {
      eol: this.currentEOL,
      element: this.currentElement.element.number,
      evalA: this.translateBool(this.agreeA),
      evalB: this.translateBool(this.agreeB),
      evalC: this.translateBool(this.agreeC),
      evalD: this.translateBool(this.agreeD),
      evalE: this.translateBool(this.agreeE),
      explA: this.normalize(this.explainA),
      explB: this.normalize(this.explainB),
      explC: this.normalize(this.explainC),
      explD: this.normalize(this.explainD),
      explE: this.normalize(this.explainE),
      suggA: this.normalize(this.suggestA),
      suggB: this.normalize(this.suggestB),
      suggC: this.normalize(this.suggestC),
      suggD: this.normalize(this.suggestD),
      suggE: this.normalize(this.suggestE)
    }
    try {
      await this.http.apiPost('https://63afc83b649c73f572c23e57.mockapi.io/api/reviews', data);
      await this.http.apiPost('https://sheet.best/api/sheets/a705ed67-bbd4-4196-a037-368e34ab4de3',data);
      this.currentStepIndex = 0;
      this.goToElements();
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }



  checkElements(element:string)
  {
    switch(element)
    {
      case "1":
        this.isChecked1 = true;
        break;
      case "2":
        this.isChecked2 = true;
        break;
    }

  }

  async updateElements()
  {
    const data = await this.http.apiGet('https://63afc83b649c73f572c23e57.mockapi.io/api/reviews?eol=' + this.currentEOL);
    if (data && Array.isArray(data)) {
      for (const item of data) {
        this.checkElements(item.element);
      }
    }
  }

  ngOnInit() {
    const code = localStorage.getItem('eol'); 
    if (code!=null)
    {
      this.currentEOL = code;
      this.args = this.route.snapshot.paramMap.get('args');
      this.currentStepIndex = 0;
      this.updateElements();
    }else{
     this.router.navigate(['/']);
    }
  }

}
