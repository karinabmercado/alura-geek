import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  
  id: string;
  producto: Producto = {
    nombre: '',
    categoria: '',
    valor: null,
    imagen: '',
    descripcion: '',
    id: ''
  }

  @ViewChild('productoForm') productoForm: NgForm;

  constructor(
    private productoService: ProductosService,
    private flashMessages: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productoService.getProducto(this.id).subscribe(
      productoIn => {
        this.producto = productoIn;
      }
    );
  }

  modificarProducto({value, valid}: {value: Producto, valid: boolean}): void{
    if(!valid){
      this.flashMessages.show('Datos ingresados incorrectos', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      this.productoService.modificarProducto(this.producto);
      this.router.navigate([`/producto/${this.id}`]);
    }
  }
}
