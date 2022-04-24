import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `li {
      cursor: pointer;
    }`
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: Boolean = false;

  constructor(private PaisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.PaisService.buscarPais(this.termino)
      .subscribe({
        next: (resp) => this.paises = resp,
        error: (err) => {
          this.hayError = true;
          this.paises = [];
        },
      })

  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.PaisService.buscarPais(termino)
      .subscribe({
        next: (paises) => this.paisesSugeridos = paises.splice(0, 5),
        error: (err) => this.paisesSugeridos = []
      })
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);

  }

}

