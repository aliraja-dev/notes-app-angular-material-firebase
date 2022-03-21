export class User {
  constructor(
    public name: string | null,
    public email: string | null,
    public isAuthenticated: boolean,
    public notes: [
      { title: string, date: Date, noteId: string }
    ],
    public uid?: string | null,


  ) { }
}


//TODO make these fields private and setup getters and setters here for future.
