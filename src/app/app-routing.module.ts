import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { AllProductsComponent } from './componentes/all-products/all-products.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { AuthGuard } from './guardianes/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'all-products', component: AllProductsComponent},
  {path: 'producto/:id', component: ProductoComponent},
  {path: 'agregar', component: AgregarProductoComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard]},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: '**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
