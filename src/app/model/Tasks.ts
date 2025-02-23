export class Tasks {
  id?: number;
  title: string;
  due_date: Date;
  status_id: number;
  status_desc: string;

  constructor(id: number, title: string, due_date: Date, status_id: number, status_desc: string) {
    this.id = id;
    this.title = title;
    this.due_date = due_date;
    this.status_id = status_id;
    this.status_desc = status_desc;
  }

}
