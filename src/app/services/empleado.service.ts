import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:8080/empleado';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmpleadoPorId(id: number): Observable<Empleado> {
    console.log(id)
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`http://localhost:8080/empleado/${id}`, empleado);
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Empleado>(this.apiUrl, empleado, { headers });
  }

  deleteEmpleadoPorId(id: number): Observable<Empleado> {
    console.log(id)
    return this.http.delete<Empleado>(`${this.apiUrl}/${id}`);
  }


}
