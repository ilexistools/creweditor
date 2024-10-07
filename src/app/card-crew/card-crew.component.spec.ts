import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCrewComponent } from './card-crew.component';

describe('CardCrewComponent', () => {
  let component: CardCrewComponent;
  let fixture: ComponentFixture<CardCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCrewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
