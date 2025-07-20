import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfigFormComponent } from './button-config-form.component';

describe('ButtonConfigFormComponent', () => {
  let component: ButtonConfigFormComponent;
  let fixture: ComponentFixture<ButtonConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
