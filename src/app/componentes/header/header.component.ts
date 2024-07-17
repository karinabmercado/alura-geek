import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modelos/producto.model';
import { LoginService } from 'src/app/servicios/login.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;
  listaProductos: Array<Producto>;
  inputSearch: string = '';
  plantillaImagen: string = '../../../assets/productos/';
  resultadoSearch: Array<Producto> = [
    {id: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    valor: null,
    imagen: '',
  },
  ];

  constructor(private loginService: LoginService,
              private router: Router,
              private productoService: ProductosService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos => {
        this.listaProductos = productos;
      }
    );

    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      }
    );

  }

  cerrarSesion():void{
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  adminBtn(list: Element, arrow: Element): void{
    list.classList.toggle('show');
    arrow.classList.toggle('fa-angle-down')
    arrow.classList.toggle('fa-angle-up')
  }

  menuBurger(burger:Element, adminMenu: Element): void{
    burger.classList.toggle('active');
    adminMenu.classList.toggle('active');
  }

  buscador(): void{
   this.resultadoSearch = this.listaProductos.filter(producto => producto.nombre.toUpperCase().includes(this.inputSearch.toUpperCase()));
  }

  navegar(id: string): void{
    this.router.navigate([`/producto/${id}`]);
  }

  searchInput(input:Element): void{
    input.classList.toggle('active');
  }
}
