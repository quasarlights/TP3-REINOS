import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelEmpleadoComponent } from './components/panel-empleado/panel-empleado.component';
import { CardsComponent } from './components/cards/cards.component';
import { PanelJornadaComponent } from './components/panel-jornada/panel-jornada.component';

const routes: Routes = [
  { path: '', component: CardsComponent },
  { path: 'empleado', component: PanelEmpleadoComponent },
  { path: 'jornada', component: PanelJornadaComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
