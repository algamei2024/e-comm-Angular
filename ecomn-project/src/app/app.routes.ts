import {Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: "full" },
    {path:'Home',component:HomeComponent},
    { path: 'seller', loadChildren: () => import('./components/sellerModule/seller.module').then(m => m.SellerModule) },
    {
        path: 'app', loadChildren: () =>
            import('./app.module').then(m=>m.AppModule)
    },
];
