import { Routes } from '@angular/router';
// 1. Importar todos nuestros componentes página
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { Notfound } from './pages/notfound/notfound';
import { Login } from './pages/login/login';
import { Reviews } from './pages/reviews/reviews';
// importat el guardian y especificar qué rutas son protegidas
import { authGuard } from './guards/auth-guard';
import { Users } from './pages/admin/users/users';
import { Inventory } from './pages/admin/inventory/inventory';

export const routes: Routes = [    
    {path:'',component: Home, title :'Inicio'},
    {path:'products', component: Products, title :'Productos y Subastas'},
    {path:'register',component: Register, title :'¡Registrate!'},
    {
        path:'admin',
        component: Admin, 
        title :'Dashboard',
        canActivate: [authGuard],
        canActivateChild: [authGuard], //Proteger rutas hijas
        children: [
            {path: "", component: Users},
            {path: "inventory", component: Inventory} //title es opcional
        ]
    },
    {path:'login',component: Login, title :'Inicio de sesion'},
    {path :'reviews',component :Reviews , title :'Opiniones'},
    {path:'**',component: Notfound, title :'404'}
];
