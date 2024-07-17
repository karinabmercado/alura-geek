import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'flash-messages-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { FormsModule } from '@angular/forms';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { AllProductsComponent } from './componentes/all-products/all-products.component';
import { ProductosService } from './servicios/productos.service';
import { LoginService } from './servicios/login.service';
import { AuthGuard } from './guardianes/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductoComponent,
    AgregarProductoComponent,
    NoEncontradoComponent,
    HomeComponent,
    EditarComponent,
    QuienesSomosComponent,
    AllProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore, 'eccomerce-alura'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ProductosService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
