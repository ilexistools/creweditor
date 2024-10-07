import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesGptComponent } from './examples-gpt.component';

describe('ExamplesGptComponent', () => {
  let component: ExamplesGptComponent;
  let fixture: ComponentFixture<ExamplesGptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesGptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamplesGptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
