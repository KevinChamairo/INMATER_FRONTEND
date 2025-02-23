import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../model/Tasks';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiUrl);
  }

  // Crear una nueva tarea
  createTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task);
  }

  // Actualizar una tarea por ID
  updateTask(id: number, task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/${id}`, task);
  }

  // Eliminar una tarea por ID
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

