import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesApisComponent } from './examples-apis.component';

describe('ExamplesApisComponent', () => {
  let component: ExamplesApisComponent;
  let fixture: ComponentFixture<ExamplesApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamplesApisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamplesApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
