import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.scss']
})
export class GestionPersonasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEstudiantes(){
    this.router.navigate([`/pages/gestionPersonas/estudiantes`]);
  }

  goToProfesores(){
    this.router.navigate([`/pages/gestionPersonas/profesores`]);
  }

  goToSupervisores(){
    this.router.navigate([`/pages/gestionPersonas/supervisores`]);
  }

}
