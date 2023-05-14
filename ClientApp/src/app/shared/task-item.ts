export class TaskItem {
  constructor(
    public id : number,
    public title: string){
  }

  toggleIsDone(){
    this.isDone = !this.isDone;
  }

  public isDone = false;
}
