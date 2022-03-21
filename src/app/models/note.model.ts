export class Note {
  constructor(
    public title: string,
    public body: string,
    public uid: string,
    public authorId: string
  ) { }
}

//TODO make the fields private and setup getters and setters for the model class
