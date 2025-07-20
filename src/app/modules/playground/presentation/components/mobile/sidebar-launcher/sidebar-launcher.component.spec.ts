import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLauncherComponent } from './sidebar-launcher.component';

describe('SidebarLauncherComponent', () => {
  let component: SidebarLauncherComponent;
  let fixture: ComponentFixture<SidebarLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLauncherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
