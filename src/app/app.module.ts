import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoListComponent } from './components/empleado-list/empleado-list.component';
import { EmpleadoService } from './services/empleado.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import { PanelEmpleadoComponent } from './components/panel-empleado/panel-empleado.component';
import { DeleteEmpleadoComponent } from './components/delete-empleado/delete-empleado.component';
import { ReadEmpleadoComponent } from './components/read-empleado/read-empleado.component';

import { UpdateEmpleadoComponent } from './components/update-empleado/update-empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelJornadaComponent } from './components/panel-jornada/panel-jornada.component';
import { CreateJornadaComponent } from './components/create-jornada/create-jornada.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ConceptoService } from './services/concepto.service';
import { ReadJornadaComponent } from './components/read-jornada/read-jornada.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoListComponent,
    NavbarComponent,
    CardsComponent,
    PanelEmpleadoComponent,
    DeleteEmpleadoComponent,
    ReadEmpleadoComponent,
    CreateEmpleadoComponent,
    UpdateEmpleadoComponent,
    PanelJornadaComponent,
    CreateJornadaComponent,
    ReadJornadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmpleadoService, ConceptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
