import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLauncherComponent } from './config-launcher.component';

describe('ConfigLauncherComponent', () => {
  let component: ConfigLauncherComponent;
  let fixture: ComponentFixture<ConfigLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigLauncherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
