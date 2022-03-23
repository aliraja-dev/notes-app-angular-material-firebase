import { Note } from "../interfaces/note.interface";
import { User } from "../interfaces/user.interface";

export class CreateNote {
  static readonly type = "[Note] Create"
  constructor(public payload: Note) { }
}
//* We will store the title and some meta data of every note on the user document, and when the user clicks on a certain note title in the list we will fetch the note using the note UID from firebase

export class FetchNote {
  static readonly type = "[Note] Fetch"
  constructor(public uid: string) { }
}

export class UpdateNote {
  static readonly type = "[Note] Update"
  constructor(public payload: Note) { }
}

export class DeleteNote {
  static readonly type = "[Note] Delete"
  constructor(public uid: string) { }
}

export class GetAllNotes {
  static readonly type = "[Note] Get All"
  constructor(public payload: Note[]) { }
}

//* USER AUTHENTICATION ACTIONS
export class LoginUser {
  static readonly type = "[User] Login"
  constructor(public payload: User) { }
}

export class LogoutUser {
  static readonly type = "[User] Logout User"
  constructor(public uid: string) { }
}


//* NOTE SELECTION STATE

export class NoteSelected {
  static readonly type = "[Note] Note Selected";
  constructor(public payload: Note) { }
}
