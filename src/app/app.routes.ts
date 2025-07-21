import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout/layout.component';
import { HomeComponent } from './modules/home/presentation/pages/home/home.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent, 
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'about',
        loadComponent: () =>
          import('./modules/about/presentation/pages/about/about.component')
            .then(m => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./modules/contact/presentation/pages/contact/contact.component')
            .then(m => m.ContactComponent),
      },
      {
        path: 'patterns',
        loadComponent: () =>
          import('./modules/patterns/presentation/pages/patterns/patterns.component')
            .then(m => m.PatternsComponent),
      },
      {
        path: 'playground',
        loadComponent: () =>
          import('./modules/playground/presentation/pages/playground/playground.component')
            .then(m => m.PlaygroundComponent),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./modules/skills/presentation/pages/skills/skills.component')
            .then(m => m.SkillsComponent),
        children: [
          { path: '', redirectTo: 'frontend', pathMatch: 'full' },
          {
            path: 'frontend',
            loadComponent: () =>
              import('./modules/skills/presentation/pages/frontend/frontend.component')
                .then(m => m.FrontendComponent)
          },
          {
            path: 'backend',
            loadComponent: () =>
              import('./modules/skills/presentation/pages/backend/backend.component')
                .then(m => m.BackendComponent)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' },
];
