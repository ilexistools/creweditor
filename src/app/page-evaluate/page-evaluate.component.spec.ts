import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEvaluateComponent } from './page-evaluate.component';

describe('PageEvaluateComponent', () => {
  let component: PageEvaluateComponent;
  let fixture: ComponentFixture<PageEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEvaluateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
