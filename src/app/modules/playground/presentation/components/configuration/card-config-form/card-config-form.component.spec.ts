import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConfigFormComponent } from './card-config-form.component';

describe('CardConfigFormComponent', () => {
  let component: CardConfigFormComponent;
  let fixture: ComponentFixture<CardConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
