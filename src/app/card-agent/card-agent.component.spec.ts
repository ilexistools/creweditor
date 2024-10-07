import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAgentComponent } from './card-agent.component';

describe('CardAgentComponent', () => {
  let component: CardAgentComponent;
  let fixture: ComponentFixture<CardAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
