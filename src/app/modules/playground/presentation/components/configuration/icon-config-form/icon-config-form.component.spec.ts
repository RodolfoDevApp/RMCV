import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconConfigFormComponent } from './icon-config-form.component';

describe('IconConfigFormComponent', () => {
  let component: IconConfigFormComponent;
  let fixture: ComponentFixture<IconConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconConfigFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
