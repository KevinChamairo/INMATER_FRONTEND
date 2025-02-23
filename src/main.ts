import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TasksComponent } from './app/app.component';

bootstrapApplication(TasksComponent, appConfig)
  .catch(err => console.error(err));

