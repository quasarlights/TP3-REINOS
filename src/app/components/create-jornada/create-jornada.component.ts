import { Component, OnInit } from '@angular/core';
import { Concepto } from 'src/app/models/Concepto';
import { JornadaRequest } from 'src/app/models/JornadaRequest';
import { Empleado } from 'src/app/models/Empleado';
import { ConceptoService } from 'src/app/services/concepto.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { JornadaService } from 'src/app/services/jornada.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-jornada',
  templateUrl: './create-jornada.component.html',
  styleUrls: ['./create-jornada.component.css']
})
export class CreateJornadaComponent implements OnInit{
  
  constructor(private jornadaService: JornadaService,private conceptoService: ConceptoService,
              private empleadoService: EmpleadoService, private router:Router){}
  
  empleados: Empleado[]=[];
  conceptos: Concepto[]=[];
  fechaJornada= "";
  
  ngOnInit(): void {
    this.conceptoService.getConceptos().subscribe(data=>{
      this.conceptos=data});
    this.empleadoService.getEmpleados()
      .subscribe(data=>{
        this.empleados= data;})
  }

  @ViewChild('horasTrabajadas', { static: true })
  horasTrabajadas!: ElementRef;
  
  empleadoIdSeleccionado=0;
  conceptoIdSeleccionado=0;
  notConceptoDiaLibre=false;
  horasDisabled= false;
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//HORAS TRABAJADAS NOT FOR DIA LIBRE
esDiaLibre(event: any){
  if (this.conceptoIdSeleccionado!=3) {
    this.notConceptoDiaLibre=true;
    this.horasDisabled= false;
  }else if(this.conceptoIdSeleccionado==3){
    this.horasDisabled= true;
  }
}


horasTrabajadasDiaLibre(){
  if(this.conceptoIdSeleccionado==3){
    this.horasDisabled= true;
  }
    
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDACION HORAS TRABAJADAS
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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FETCH API CREAR
mensaje: string = '';
crearJornada(): void {
  const inputHorasTrabajadas = <HTMLInputElement>document.getElementById('horasTrabajadas');
  const horasTrabajadasValue = inputHorasTrabajadas.value
  const horasTrabajadas = horasTrabajadasValue === null ? 0 : +horasTrabajadasValue;
  
  if (horasTrabajadas!=0) {  
  const nuevaJornada: JornadaRequest = {
        idEmpleado: this.empleadoIdSeleccionado,
        idConcepto: this.conceptoIdSeleccionado,
        fecha: this.fechaJornada,
        horasTrabajadas: horasTrabajadas !== null && horasTrabajadas !== 0 ? horasTrabajadas : undefined
       };
    this.jornadaService.createJornada(nuevaJornada)
          .subscribe((jornadaCreada)=>{
            this.mensaje= 'Jornada creada exitosamente: '+jornadaCreada.concepto;
               alert(this.mensaje);
               this.router.navigate(['/']);
              },
              (erro)=>{
                this.mensaje= "Error al crear la jornada: "+erro.error.message;
                alert(this.mensaje)
              })}else{
                console.log("this.empleadoIdSeleccionado,"+this.empleadoIdSeleccionado);
                console.log("this.conceptoIdSeleccionado,"+this.conceptoIdSeleccionado);
                console.log("this.fechaJornada,"+this.fechaJornada,);
                
                const nuevaJornada: JornadaRequest = {
                  idEmpleado: this.empleadoIdSeleccionado,
                  idConcepto: this.conceptoIdSeleccionado,
                  fecha: this.fechaJornada,                  
                 };
                 console.log(nuevaJornada);
                 
              this.jornadaService.createJornada(nuevaJornada)
                    .subscribe((jornadaCreada)=>{
                      this.mensaje= 'Jornada creada exitosamente: '+jornadaCreada.concepto;
                         alert(this.mensaje);
                         this.router.navigate(['/']);
                        },
                        (erro)=>{
                          this.mensaje= "Error al crear la jornada: "+erro.error.message;
                          alert(this.mensaje)
                        })
              }
              
        }////aca termina
    
     }

  



      /*
    this.jornadaService.createJornada(nuevaJornada).subscribe(
      (nuevaJornada) => {
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
  }*/
  





