import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { ElementFormComponent } from '../element-form/element-form.component';

@Component({
  selector: 'app-page-evaluate',
  standalone: true,
  imports: [CommonModule,  FooterComponent, ElementFormComponent],
  templateUrl: './page-evaluate.component.html',
  styleUrl: './page-evaluate.component.css'
})
export class PageEvaluateComponent {

}
