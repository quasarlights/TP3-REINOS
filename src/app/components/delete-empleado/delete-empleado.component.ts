import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-delete-empleado',
  templateUrl: './delete-empleado.component.html',
  styleUrls: ['./delete-empleado.component.css']
})
export class DeleteEmpleadoComponent {

  constructor(private empleadoService: EmpleadoService,  private router: Router){}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//TRAIGO LOS TODOS LOS EMPLEADOS Y ELIJO
  empleados:Empleado[]=[];  
  empleadoIdSeleccionado: number= 0; 

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.empleados=data;})
  };
  
  seleccionarEmpleado(event: any) {
    this.empleadoIdSeleccionado = event.target.value; 
    console.log("Empleado seleccionado:", this.empleadoIdSeleccionado); 
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CONFIMACION DE BAJA
mostrarMensajeSelect=false;
mostrarMensajeBaja=false;
abrirModal() {
  if(this.empleadoIdSeleccionado == -1){
    alert("Seleccione un empleado");
  }else if(this.empleadoIdSeleccionado==0){
    this.mostrarMensajeSelect=true;
  }else if (confirm("Confirma la baja del empleado?")) {
    this.eliminarEmpleado()
  }
}

eliminarEmpleado(){
  this.empleadoService.deleteEmpleadoPorId(this.empleadoIdSeleccionado)
      .subscribe(()=>{
        alert("Empleado dado de baja")
        this.router.navigate(['/']);
        },
        error=>{
          console.error("error al borrar empleado: "+error);
          alert(error.error.message);
        })
}



}
