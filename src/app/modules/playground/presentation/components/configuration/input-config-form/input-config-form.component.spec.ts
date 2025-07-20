import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConfigFormComponent } from './input-config-form.component';

describe('InputConfigFormComponent', () => {
  let component: InputConfigFormComponent;
  let fixture: ComponentFixture<InputConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
