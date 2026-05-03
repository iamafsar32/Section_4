import { Routes } from '@angular/router';
import { DashboardComponent }    from './pages/dashboard/dashboard';
import { TransactionsComponent } from './pages/transactions/transactions';
import { CategoriesComponent }   from './pages/categories/categories';

export const routes: Routes = [
  { path: '',             redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',    component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'categories',   component: CategoriesComponent },
  { path: '**',           redirectTo: 'dashboard' }
];