import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent,
    loadChildren: () => { return import('./auth/auth.module').then((m) => m.AuthModule); },
  },
  {
    path: 'admin', component: AdminComponent,
    loadChildren: () => { return import('./admin/admin.module').then((m) => m.AdminModule); },
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
