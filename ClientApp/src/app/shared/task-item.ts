export class TaskItem{
  constructor(
    public id : string,
    public title: string){
  }

  public isDone = false;

  public showTaskItem = true;
}
