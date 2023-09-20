import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jornada } from '../models/Jornada';
import { JornadaRequest } from '../models/JornadaRequest';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  constructor(private http:HttpClient) { }

  private apiUrl= 'http://localhost:8080/jornada';

  getJornadas(): Observable<Jornada[]>{
    return this.http.get<Jornada[]>(this.apiUrl);
  }

  createJornada(jornada: JornadaRequest): Observable<Jornada> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Jornada>(this.apiUrl, jornada, { headers });
  }

  getJornada(nroDocumento?: number, fecha?: string): Observable<any[]> {
    let params = new HttpParams();    
    
    if (typeof nroDocumento !== 'string' && nroDocumento !== undefined) {
      params = params.set('nroDocumento', nroDocumento.toString());
    }    
    if (fecha) {
      params = params.set('fecha', fecha);
    }
    return this.http.get<any[]>(`${this.apiUrl}/`, { params });
  }

}
