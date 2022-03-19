export class User {
  constructor(
    public name: string | null,
    public email: string | null,
    public isAuthenticated: boolean,
    public uid?: string | null,


  ) { }
}


//TODO make these fields private and setup getters and setters here for future.
