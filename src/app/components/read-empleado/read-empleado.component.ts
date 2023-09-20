import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-read-empleado',
  templateUrl: './read-empleado.component.html',
  styleUrls: ['./read-empleado.component.css']
})
export class ReadEmpleadoComponent implements OnInit{
  
   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
constructor(private empleadoService: EmpleadoService,){}

  empleados:Empleado[]=[];
  empleados1:Empleado[]=[];
  btnListarComment: boolean= false;

  empleado: Empleado= 
  {
    id: 0,
    nroDocumento: 0,
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    fechaIngreso: '',
    fechaCreacion: ''
  }; 
  empleadoSeleccionado: Empleado= 
    {
      id: 0,
      nroDocumento: 0,
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      fechaIngreso: '',
      fechaCreacion: ''
    };
    empleadoIdSeleccionado: number= 0; 

  mostrarEmpleadoSelect = false;
  mostrarTodosEmpleados = false;

  //TRAIGO LOS TODOS LOS EMPLEADOS  
  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(data=>{
      this.empleados=data;})
};
 //radioSeleccionado: boolean = false; // Esto representará el estado del input tipo radio
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
onRadioSeleccionado(opcion: string): void {
  if (opcion === 'todos') {
    this.mostrarTodosEmpleados = true;
    this.mostrarEmpleadoSelect = false;
    this.empleado = {
      id: 0,
      nroDocumento: 0,
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      fechaIngreso: '',
      fechaCreacion: ''
    };

  } else if (opcion === 'empleado') {
    this.mostrarEmpleadoSelect = true;
    this.mostrarTodosEmpleados = false;
    this.empleados1 = [];
    }
  }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SELECCIONAR ID DEL EMPLEADO/ SELECCIONAR TODOS
  seleccionarEmpleado(event: any) {
    this.empleadoIdSeleccionado = event.target.value; 
    console.log("Empleado seleccionado:", this.empleadoIdSeleccionado); 
  }
  
  seleccionarTodos(event:any){
    this.empleadoIdSeleccionado= 0;
    console.log("Empleado seleccionado:", this.empleadoIdSeleccionado);    
  }

  //FETCH API
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
read(){
  this.empleados1 = [];
  
  if(this.empleadoIdSeleccionado==0 && !this.mostrarEmpleadoSelect){
    this.empleadoIdSeleccionado=0;
    this.readAllEmpleados();
    this.empleado=
    {
      id: 0,
      nroDocumento: 0,
      nombre: '',
      apellido: '',
      email: '',
      fechaNacimiento: '',
      fechaIngreso: '',
      fechaCreacion: ''
    };
    console.log(this.empleado);
    
  }else if(this.empleadoIdSeleccionado!=0){
    this.readEmpleado();
  }else{
    this.btnListarComment=true;
  }
}


readEmpleado() {
  if(this.empleadoIdSeleccionado == -1){
    alert("Seleccione un empleado");
  }else{
  this.empleadoService.getEmpleadoPorId(this.empleadoIdSeleccionado)
  
    .subscribe(response => {
      console.log("Empleado actualizado con éxito:", response);
      this.empleado = response;
    },
    error => {
      console.error("Error actualizando el empleado:", error);
      alert(error.error.message);
    });
    }
  }

  readAllEmpleados() {
    this.empleadoIdSeleccionado=0;
    this.empleadoService.getEmpleados()
      .subscribe(response => {
        console.log("Empleados obtenidos con éxito:", response);
        this.empleados1 = response;
      },
      error => {
        console.error("Error al obtener los empleados:", error);
        alert(error.error.message);
      });
      this.empleadoIdSeleccionado=0;
      console.log(this.empleadoIdSeleccionado+"#######");
      
  }

  
  
}

