import { Component } from '@angular/core';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { emailValidator } from '../../../shared/validators/email-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent {

  //VALIDACION DNI
  mostrarMensaje: boolean = false; 

  soloNumeros(event: any): void {
    const input = event.target;
    const value = input.value;
    const numbers = /^[0-9]*$/;

    if (!value.match(numbers)) {
      input.value = value.replace(/[^0-9]/g, ''); 
      this.mostrarMensaje = true;
    } else {
      this.mostrarMensaje = false; 
    }
  }

  //VALIDACIONES NOMBRE Y APELLIDO
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

  //VALIDACION EMAIL
 formulario: FormGroup;
 
 constructor(private fb: FormBuilder, private empleadoService: EmpleadoService, private router: Router) {
  
  this.formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]], 
    admissionDay: ['', Validators.required],
    birthDay: ['', Validators.required]
  });
}
//VALIDAR FECHA NACIMIENTO
/*maxDate = new Date();


mostrarMensajeFechaNacimiento: boolean = false;

validarFechaNacimiento(event:any): void {
  const birthDateInput = new Date(this.birthDate);
  const currentDate = new Date();
  const edadMinima = 18;}*/
/*
birthDate: string = '';
maxDate: string='';
mostrarMensajeFechaNacimiento: boolean = false;
currentDate = new Date();
maxDateBirth = this.currentDate.toISOString().split('T')[0];
*/
maxDate: string = '';
maxDateBirth: string = '';
mostrarMensajeFechaNacimiento: boolean = false;

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

  admissionDate: string = '';
  mostrarMensajeFechaAdmision: boolean = false;

  validarFechaAdmision(): void {
    const admissionDateInput = new Date(this.admissionDate);
    const currentDate = new Date();

    if (admissionDateInput > currentDate) {
      this.mostrarMensajeFechaAdmision = true;
    } else {
      this.mostrarMensajeFechaAdmision = false;
    }
  }
  //ENVIAR REQUEST PARA CREAR EMPLEADO
  mensaje: string = '';
  crearEmpleado(): void {
    // Verifica si el campo de correo electrónico es válido
    const emailInput = <HTMLInputElement>document.getElementById('email');
    if (emailInput && emailInput.validity.valid) {
      // El correo electrónico es válido, puedes enviar la solicitud
      const nuevoEmpleado: Empleado = {
        id: 0, 
        nroDocumento: +(<HTMLInputElement>document.getElementById('nroDocumento')).value,
        nombre: (<HTMLInputElement>document.getElementById('name')).value,
        apellido: (<HTMLInputElement>document.getElementById('surname')).value,
        email: emailInput.value,
        fechaNacimiento: (<HTMLInputElement>document.getElementById('birthDay')).value,
        fechaIngreso: (<HTMLInputElement>document.getElementById('admissionDay')).value,
        fechaCreacion: ''
      };
  
      this.empleadoService.createEmpleado(nuevoEmpleado).subscribe(
        (empleadoCreado) => {
          this.mensaje = 'Empleado ' + empleadoCreado.nombre + ' ' + empleadoCreado.apellido + ' creado exitosamente';
          alert(this.mensaje);
          this.router.navigate(['/']);
        },
        (error) => {
          this.mensaje = 'Error al crear el empleado: ' + error.error.message;
          alert(this.mensaje);
        }
      );
    } else {
      // El correo electrónico no es válido, muestra un mensaje de error
      alert('Por favor, ingrese un correo electrónico válido.');
    }
  }
}
