import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  productos: Array<Producto>;
  plantillaImagen: string = '../../../assets/productos/';

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productosIn =>{
        this.productos = productosIn;
      }
    ); 
  }

  irAProducto(id: string): void{
    this.router.navigate([`/producto/${id}`]);
  }

}
