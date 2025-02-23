export class Tasks {
  id?: number;
  title: string;
  due_date: Date;
  status_id: number;

  constructor(id: number, title: string, due_date: Date, status_id: number) {
    this.id = id;
    this.title = title;
    this.due_date = due_date;
    this.status_id = status_id;
  }

}
