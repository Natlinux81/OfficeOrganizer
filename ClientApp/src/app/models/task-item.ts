export class TaskItem{
  constructor(
    public id : string,
    public title: string,
    public owner: string){
  }

  public isDone = false;
  public isEditMode = false;


}
