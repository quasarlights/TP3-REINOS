import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit{

  empleados:Empleado[]=[];
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
  empleadoIdSeleccionado: number= 0; // Almacena ID del empleado seleccionado

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

  constructor(private empleadoService: EmpleadoService, private router: Router){}

  ngOnInit(): void {
      this.empleadoService.getEmpleados().subscribe(data=>{
        this.empleados=data;})
  };

// Carga la info del empleado cuando se selecciona un empleado
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  cargarEmpleado() {
    if (this.empleadoIdSeleccionado) {
      this.empleadoService.getEmpleadoPorId(this.empleadoIdSeleccionado).subscribe(empleado => {
        this.empleadoSeleccionado = empleado;
      });
    }
  }
//VALIDACION DNI
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
mostrarMensaje: boolean = false;

soloNumeros(event:any): void {
  const value = this.empleadoSeleccionado.nroDocumento;

  if (!Number.isInteger(value)) {
    this.mostrarMensaje = true;
  } else {
    this.mostrarMensaje = false;
  }
}

  //VALIDACIONES NOMBRE Y APELLIDO
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  mostrarMensajeNombre: boolean = false; 
  mostrarMensajeApellido: boolean = false; 

  soloLetras(event: any): void {
    const input = event.target;
    const value = input.value;
    const letters = /^[A-Za-z ]*$/;

    if (!value.match(letters)) {
      input.value = value.replace(/[^A-Za-z ]/g, '');
      this.mostrarMensajeNombre = input.id === 'name';
      this.mostrarMensajeApellido = input.id === 'surname';
    } else {
      this.mostrarMensajeNombre = false;
      this.mostrarMensajeApellido = false;
    }
  }

  //VALIDAR EMAIL
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  validarEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  //VALIDAR FECHA DE NACIMIENTO
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

maxDate: string='';
mostrarMensajeFechaNacimiento: boolean = false;
currentDate = new Date();
maxDateBirth = this.currentDate.toISOString().split('T')[0];

validarFechaNacimiento(fechaNacimiento: string): void {
  const birthDateInput = new Date(fechaNacimiento);
  const currentDate = new Date();
  const edadMinima = 18;

  // Calcula la diferencia en años entre las fechas
  let edad = currentDate.getFullYear() - birthDateInput.getFullYear();

  // Comprueba si la fecha actual es anterior al cumpleaños de este año
  const mesActual = currentDate.getMonth() + 1;
  const diaActual = currentDate.getDate();
  const mesNacimiento = birthDateInput.getMonth() + 1;
  const diaNacimiento = birthDateInput.getDate();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }

  // Comprueba si la edad es menor que la edad mínima permitida usando la función adaptada
  if (!this.isOverEighteen(birthDateInput.getFullYear(), mesNacimiento, diaNacimiento)) {
    this.mostrarMensajeFechaNacimiento = true;
  } else {
    this.mostrarMensajeFechaNacimiento = false;
  }
}

isOverEighteen(year: number, month: number, day: number): boolean {
  const now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  const dob = year * 10000 + month * 100 + day * 1;

  return now - dob > 180000;
}

 //VALIDACION FECHA INGRESO
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 admissionDate: string = '';
 mostrarMensajeFechaAdmision: boolean = false;

 validarFechaAdmision(event: any): void {
   const admissionDateInput = new Date(this.admissionDate);
   const currentDate = new Date();

   if (admissionDateInput > currentDate) {
     this.mostrarMensajeFechaAdmision = true;
   } else {
     this.mostrarMensajeFechaAdmision = false;
   }
 }

//FETCH API
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  actualizarEmpleado() {
    this.empleadoService.updateEmpleado(this.empleadoIdSeleccionado, this.empleadoSeleccionado)
      .subscribe(
        response => {
          console.log("Empleado actualizado con éxito:", response);
          alert("Acutualizacion exitosa: "+ response.apellido)
          this.router.navigate(['/']);
        },
        error => {
          console.error("Error actualizando el empleado:", error);
        
          alert(error.error.message)
        }
      );
  }
  

}
