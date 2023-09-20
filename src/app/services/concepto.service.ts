import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concepto } from '../models/Concepto';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  constructor(private http:HttpClient) { }

  private apiUrl= 'http://localhost:8080/concepto';

  getConceptos(): Observable<Concepto[]>{
    return this.http.get<Concepto[]>(this.apiUrl);
  }
}
