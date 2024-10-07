import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStepsComponent } from './page-steps.component';

describe('PageStepsComponent', () => {
  let component: PageStepsComponent;
  let fixture: ComponentFixture<PageStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
