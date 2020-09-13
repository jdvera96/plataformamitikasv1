import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';


import {CursosComponent} from './cursos/cursos.component';
import {CursoComponent} from './curso/curso.component';

import {TareasComponent} from './tareas/tareas.component';
import {NuevaTareaComponent} from './nueva-tarea/nueva-tarea.component'

import {CalificacionesComponent} from './calificaciones/calificaciones.component'
import {CalificarTareaComponent} from './calificar-tarea/calificar-tarea.component'

import {AsistenciasComponent} from './asistencias/asistencias.component'

import { DigitOnlyDemosComponent } from './digit-only-demos/digit-only-demos.component';

import {NotificacionesSPComponent} from './notificaciones-sp/notificaciones-sp.component';
import {CursosSpComponent} from './supervisor/cursos-sp/cursos-sp.component';



import {GestionPersonasComponent} from './administrador/gestion-personas/gestion-personas.component'
import {GestionEstudiantesComponent} from './administrador/gestion-estudiantes/gestion-estudiantes.component';
import {GestionProfesoresComponent} from './administrador/gestion-profesores/gestion-profesores.component';
import {GestionSupervisoresComponent} from './administrador/gestion-supervisores/gestion-supervisores.component';



import {LoginComponent} from './auth/login/login.component';

var login=localStorage.getItem('login-mitikas');
var routesMenu: Routes =[{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'auth/login',
      component: LoginComponent,
    },
    {
      path: '',
      redirectTo: 'auth/login',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];;

if(login!=null){
  let array=login.split('-');

  if(array[0]=='Profesor'){

    console.log('profesor logeado');
    console.log('cargando menu para profesor');

      routesMenu  = [{
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'cursos',
          component: CursosComponent,
        },
        {
          path: 'backDoor',
          component: DigitOnlyDemosComponent
        },{
          path: 'curso/:id',
          component: CursoComponent
        },{
          path: ':id/tareas',
          component: TareasComponent
        },{
          path: 'nuevaTarea',
          component: NuevaTareaComponent
        },
        {
          path: ':id/calificaciones',
          component: CalificacionesComponent
        },{
          path: 'calificar-tarea',
          component: CalificarTareaComponent
        },{ 
          path: ':id/asistencias',
          component: AsistenciasComponent
        },
        {
          path: 'layout',
          loadChildren: () => import('./layout/layout.module')
            .then(m => m.LayoutModule),
        },
        {
          path: 'forms',
          loadChildren: () => import('./forms/forms.module')
            .then(m => m.FormsModule),
        },
        {
          path: 'ui-features',
          loadChildren: () => import('./ui-features/ui-features.module')
            .then(m => m.UiFeaturesModule),
        },
        {
          path: 'modal-overlays',
          loadChildren: () => import('./modal-overlays/modal-overlays.module')
            .then(m => m.ModalOverlaysModule),
        },
        {
          path: 'extra-components',
          loadChildren: () => import('./extra-components/extra-components.module')
            .then(m => m.ExtraComponentsModule),
        },
        {
          path: 'maps',
          loadChildren: () => import('./maps/maps.module')
            .then(m => m.MapsModule),
        },
        {
          path: 'charts',
          loadChildren: () => import('./charts/charts.module')
            .then(m => m.ChartsModule),
        },
        {
          path: 'editors',
          loadChildren: () => import('./editors/editors.module')
            .then(m => m.EditorsModule),
        },
        {
          path: 'tables',
          loadChildren: () => import('./tables/tables.module')
            .then(m => m.TablesModule),
        },
        {
          path: 'miscellaneous',
          loadChildren: () => import('./miscellaneous/miscellaneous.module')
            .then(m => m.MiscellaneousModule),
        },
        {
          path: '',
          redirectTo: 'cursos',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
    }];
    
  
  }else if(array[0]=='Supervisor'){
    console.log('supervisor logeado')
    console.log('cargando menu del supervisor');

    routesMenu=[{
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'notificacionesSP',
          component: NotificacionesSPComponent,
        },{
          path: 'cursosSp',
          component: CursosSpComponent
        },
        {
          path: '',
          redirectTo: 'cursosSp',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
    }];
  }else if(array[0]=='Administrador'){
    console.log('administrador logeado');
    routesMenu=[{
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'gestionPersonas',
          component: GestionPersonasComponent
        },{
          path: 'gestionPersonas/estudiantes',
          component: GestionEstudiantesComponent
        },{
          path: 'gestionPersonas/profesores',
          component: GestionProfesoresComponent
        },{
          path: 'gestionPersonas/supervisores',
          component: GestionSupervisoresComponent
        },
        {
          path: 'notificacionesSP',
          component: NotificacionesSPComponent,
        },
        {
          path: '',
          redirectTo: 'gestionPersonas',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
    }];
  }else{
    console.log('error en credenciales');
    routesMenu=[{
      path: '',
      component: PagesComponent,
      children: [
        {
          path: 'auth/login',
          component: LoginComponent,
        },
        {
          path: '',
          redirectTo: 'auth/login',
          pathMatch: 'full',
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
    }];
  }

}else{
  console.log('no hay nadie logeado');
  
}

/* const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },{
      path: 'cursos',
      component: CursosComponent,
    },{
      path: 'curso/:id',
      component: CursoComponent
    },{
      path: 'tareas',
      component: TareasComponent
    },{
      path: 'nuevaTarea',
      component: NuevaTareaComponent
    },
    {
      path: 'calificaciones',
      component: CalificacionesComponent
    },{
      path: 'calificar-tarea',
      component: CalificarTareaComponent
    },{
      path: 'asistencias',
      component: AsistenciasComponent
    },{
      path: 'notificaciones',
      component: NotificacionesComponent
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'iot-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}]; */ 

@NgModule({
  imports: [RouterModule.forChild(routesMenu)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
