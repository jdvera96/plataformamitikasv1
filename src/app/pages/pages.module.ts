import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DigitOnlyDemosComponent } from './digit-only-demos/digit-only-demos.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './curso/curso.component';
import { TareasComponent } from './tareas/tareas.component';
import { NuevaTareaComponent } from './nueva-tarea/nueva-tarea.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { CalificarTareaComponent } from './calificar-tarea/calificar-tarea.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { NotificacionesSPComponent } from './notificaciones-sp/notificaciones-sp.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AsistenciasSpComponent } from './supervisor/asistencias-sp/asistencias-sp.component';
import { CalificacionesSpComponent } from './supervisor/calificaciones-sp/calificaciones-sp.component';
import { CursosSpComponent } from './supervisor/cursos-sp/cursos-sp.component';
import { GestionPersonasComponent } from './administrador/gestion-personas/gestion-personas.component';
import { GestionEstudiantesComponent } from './administrador/gestion-estudiantes/gestion-estudiantes.component';
import { GestionProfesoresComponent } from './administrador/gestion-profesores/gestion-profesores.component';
import { GestionSupervisoresComponent } from './administrador/gestion-supervisores/gestion-supervisores.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    DigitOnlyModule
  ],
  declarations: [
    PagesComponent,
    CursosComponent,
    CursoComponent,
    TareasComponent,
    NuevaTareaComponent,
    CalificacionesComponent,
    CalificarTareaComponent,
    AsistenciasComponent,
    NotificacionesComponent,
    NotificacionesSPComponent,
    LoginComponent,
    RegistroComponent,
    AsistenciasSpComponent,
    CalificacionesSpComponent,
    CursosSpComponent,
    GestionPersonasComponent,
    GestionEstudiantesComponent,
    GestionProfesoresComponent,
    GestionSupervisoresComponent,
    DigitOnlyDemosComponent
  ],
})
export class PagesModule {
}
