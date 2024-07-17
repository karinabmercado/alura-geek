import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto.model';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fecha: Date;
  mes: string;
  sliders: Array<Element>;
  ruta: boolean;
  plantillaImagen: string = '../../../assets/productos/';
  productosMarvel: Array<Producto> = [];
  productosConsolas: Array<Producto> = [];
  productosStarWars: Array<Producto> = [];
  productosHarryPotter: Array<Producto> = [];
  productosJuegos: Array<Producto> = [];

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {   }

  ngOnInit(): void {
    this.ruta = this.router.url == '/';
    this.fecha = new Date();
    this.mes = this.establecerMes(this.fecha.getMonth());
    this.sliders = Array.from(document.querySelectorAll('.slide'));

    this.productoService.getProductos().subscribe(
      productosIn =>{
        this.productosConsolas = productosIn.filter(producto => producto.categoria == 'consolas');
        this.productosJuegos = productosIn.filter(producto => producto.categoria == 'juegos');
        this.productosHarryPotter = productosIn.filter(producto => producto.categoria == 'harry-potter');
        this.productosMarvel = productosIn.filter(producto => producto.categoria == 'marvel');
        this.productosStarWars = productosIn.filter(producto => producto.categoria == 'star-wars');
      }
    ); 

    if(this.router.url == '/'){
      setInterval(() =>{
        this.changePosition(1);
      },5000);
    }
    }

  establecerMes(fecha: number): string{
    let mes;
    switch(fecha+1){
      case 1:
        mes = 'Enero';
        break;
      case 2:
        mes = 'Febrero';
        break;
      case 3:
        mes = 'Marzo';
        break;
      case 4:
        mes = 'Abril';
        break;
      case 5:
        mes = 'Mayo';
        break;
      case 6:
        mes = 'Junio';
        break;
      case 7:
        mes = 'Julio';
        break;
      case 8:
        mes = 'Agosto';
        break;
      case 9:
        mes = 'Septiembre';
        break;
      case 10:
        mes = 'Octubre';
        break;
      case 11:
        mes = 'Noviembre';
        break;
      case 12:
        mes = 'Diciembre';
        break;
    }
    return mes;
  }

  AchangePosition(change: number){
    if(this.ruta){
      this.changePosition(change);
    }else{
      return null;
    }
  }

  changePosition(change: number): void{
    let currentElement: number = 0;
    if(this.router.url == '/'){
      currentElement = Number(document.querySelector('.slide.show')['dataset'].id);
    }

    let value: number = currentElement;
    value+=change;
  
    if(value === 0 || value == this.sliders.length+1){
      value = value === 0 ? this.sliders.length : 1;
    }

    
    this.sliders[currentElement-1]?.classList.toggle('show')
    this.sliders[value-1]?.classList.toggle('show')

  }

  irAProducto(id: string): void{
    this.router.navigate([`/producto/${id}`]);
  }

}
