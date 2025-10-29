import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { Notfound } from './pages/notfound/notfound';
import { Login } from './pages/login/login';
import { Reviews } from './pages/reviews/reviews';
import { authGuard } from './guards/auth-guard';
import { Inventory } from './pages/admin/inventory/inventory';
import { Users } from './pages/admin/users/users';

export const routes: Routes = [    
    {path:'',component: Home, title :'Inicio'},
    {path:'products',
        component: Products, 
        title :'Productos y Subastas',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {path: 'inventory', component: Inventory, title: 'Inventario'},
            {path: 'users', component: Users, title: 'Usuarios'}
        ]   
    },
    {path:'register',component: Register, title :'¡Registrate!'},
    {path:'admin',component: Admin, title :'Dashboard'},
    {path:'login',component: Login, title :'Inicio de sesion'},
    {path :'reviews',component :Reviews , title :'Opiniones'},
    {path:'**',component: Notfound, title :'404'}
];
