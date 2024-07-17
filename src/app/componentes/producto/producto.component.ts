import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto.model';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  isLogged: boolean;
  id: string;
  producto: Producto = {
    nombre: '',
    descripcion: '',
    valor: 0,
    imagen: '',
    categoria: ''
  }
  plantillaImagen: string = '../../../assets/productos/';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      }
    );

    this.id = this.route.snapshot.params['id'];
    this.productoService.getProducto(this.id).subscribe(
      productoIn => {
        this.producto = productoIn;
      }
    );
  }

}
