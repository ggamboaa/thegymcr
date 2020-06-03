import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  // {
  //   path: '',
  //   loadChildren:
  //     // './components/authentication/authentication.module#AuthenticationModule',
  // },
  {
    path: 'home',
    // canActivate: [AuthGuard],
    loadChildren: './modules/customers/customers.module#CustomersModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
