import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `button {
      margin-right: 5px;
    }`
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['eu', 'efta', 'caricom', 'pa', 'au', 'usan', 'eeu', 'al', 'asean', 'cais', 'cefta', 'nafta', 'saarc'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private PaisService: PaisService) { }

  ngOnInit(): void {
  }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activarContinente(region: string) {

    if (region === this.regionActiva) { return; };

    this.regionActiva = region;
    this.paises = [];

    this.PaisService.buscarRegion(region).subscribe((resp) => {
      this.paises = resp;
    })
  }

}
