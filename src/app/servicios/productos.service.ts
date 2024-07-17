import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  coleccionProductos: AngularFirestoreCollection<Producto>;
  productoDoc: AngularFirestoreDocument<Producto>;
  productos: Observable<Producto[]>;
  producto: Observable<Producto>;


  constructor(private db: AngularFirestore) {
    this.coleccionProductos = db.collection('productos', ref => ref.orderBy('categoria', 'asc'));
  }

  getProductos(): Observable<Producto[]>{
    this.productos = this.coleccionProductos.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Producto;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.productos;
  }

  addProducto(producto: Producto): void{
    this.coleccionProductos.add(producto);
  }

  getProducto(id: string): Observable<Producto>{
    this.productoDoc = this.db.doc<Producto>(`productos/${id}`);
    this.producto = this.productoDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists){
          const datos = accion.payload.data() as Producto;
          datos.id = accion.payload.id;
          return datos;
        }else{
          return null;
        }
      })
    );
    return this.producto;
  }

  modificarProducto(producto: Producto): void{
    this.productoDoc = this.db.doc<Producto>(`productos/${producto.id}`);
    this.productoDoc.update(producto);
  }

  eliminarProducto(id: string): void{
    this.productoDoc = this.db.doc<Producto>(`productos/${id}`);
    this.productoDoc.delete();
  }
}
