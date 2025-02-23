import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../app/services/tasks.service';
import { Tasks } from '../app/model/Tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private fb = inject(FormBuilder);

  tasks: Tasks[] = [];
  taskForm: FormGroup;
  editing: boolean = false;
  selectedTaskId: number | null = null;

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      due_date: [''],
      status_id: [1, Validators.required]
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  // Cargar lista de tareas
  loadTasks() {
    this.tasksService.getTasks().subscribe(tasks_array => {
      this.tasks = tasks_array;
    });
  }

  // Método para manejar la creación o edición de tareas
  submitTask() {
    if (this.taskForm.valid) {
      if (this.editing && this.selectedTaskId !== null) {
        // Si estamos editando, se llama al servicio de actualización
        this.tasksService.updateTask(this.selectedTaskId, this.taskForm.value).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      } else {
        // Si estamos creando, se llama al servicio de creación
        this.tasksService.createTask(this.taskForm.value).subscribe(() => {
          this.resetForm();
          this.loadTasks();
        });
      }
    }
  }

  editTask(task: Tasks) {
    this.editing = true;
    this.selectedTaskId = task.id ?? null;

    this.taskForm.patchValue({
      title: task.title,
      due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
      status_id: task.status_id
    });
  }

  deleteTask(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.tasksService.deleteTask(id).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  resetForm() {
    this.editing = false;
    this.selectedTaskId = null;
    this.taskForm.reset({
      title: '',
      due_date: '',
      status_id: 1
    });
  }
}
