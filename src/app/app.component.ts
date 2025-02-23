import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../app/services/tasks.service';
import { Tasks } from '../app/model/Tasks';
import Swal from 'sweetalert2';

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
      const mensaje = this.editing ? 'actualizada' : 'guardada';

      Swal.fire({
        title: 'Procesando...',
        text: 'Guardando los datos...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      if (this.editing && this.selectedTaskId !== null) {
        this.tasksService.updateTask(this.selectedTaskId, this.taskForm.value).subscribe(() => {
          this.resetForm();
          this.loadTasks();
          Swal.fire({
            title: '¡Éxito!',
            text: `La tarea ha sido ${mensaje} correctamente.`,
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
        });
      } else {
        this.tasksService.createTask(this.taskForm.value).subscribe(() => {
          this.resetForm();
          this.loadTasks();
          Swal.fire({
            title: '¡Éxito!',
            text: `La tarea ha sido ${mensaje} correctamente.`,
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
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

    Swal.fire({
      title: 'Editando tarea',
      text: 'Puedes modificar los datos y guardar los cambios.',
      icon: 'info',
      confirmButtonColor: '#3085d6'
    });
  }

  deleteTask(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea de manera permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'hospital-popup',
        title: 'hospital-title',
        confirmButton: 'hospital-confirm',
        cancelButton: 'hospital-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksService.deleteTask(id).subscribe(() => {
          this.loadTasks();
          Swal.fire({
            title: 'Eliminado',
            text: 'La tarea ha sido eliminada con éxito.',
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
        });
      }
    });
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
