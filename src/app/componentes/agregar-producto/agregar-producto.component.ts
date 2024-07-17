import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  producto: Producto = {
    nombre: '',
    categoria: '',
    valor: null,
    imagen: '',
    descripcion: '',
  }

  @ViewChild('productoForm') productoForm: NgForm;

  constructor(
    private productoService: ProductosService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.productoForm);
  }


  agregarProducto({value, valid}: {value: Producto, valid: boolean}): void{
    if(!valid){
      this.flashMessages.show('Datos ingresados incorrectos', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      this.productoService.addProducto(value);
      this.router.navigate(['/']);
    }
  }
}
