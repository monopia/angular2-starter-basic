import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NamingComponent } from './naming.component';

const namingRoutes: Routes = [
  { 
    path: '',
    component: NamingComponent,
    children: []
  }
];

export const namingRouting: ModuleWithProviders = RouterModule.forChild(namingRoutes);