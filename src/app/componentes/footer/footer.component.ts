import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  fechaActual: Date = new Date();
  anio: string;

  constructor() { }

  ngOnInit(): void {
    this.anio = this.fechaActual.getFullYear().toString();
  }

}
