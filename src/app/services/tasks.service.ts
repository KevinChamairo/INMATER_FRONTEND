import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Tasks } from '../model/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiUrl);
  }

  createTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<Tasks>): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


