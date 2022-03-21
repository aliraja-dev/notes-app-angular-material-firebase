import { State, Action, StateContext, Selector, actionMatcher } from "@ngxs/store";

import { User } from "../interfaces/user.interface";
import { Note } from "../interfaces/note.interface";
import { DeleteNote, FetchNote, LoginUser, LogoutUser, UpdateNote } from "./app.actions";
import { AuthService } from "../services/auth.service";
import { NoteService } from "../services/note.service";
import { CreateNote } from "./app.actions";
import { Injectable } from "@angular/core";

export interface AppStateModel {
  user: User;
  notes: Note[]
}

@State<AppStateModel>({
  name: 'AppState',
})
@Injectable()
export class AppState {
  constructor(
    private as: AuthService,
    private ns: NoteService
  ) { }

  //* ACTIONS METHODS

  //* Use authService to log user in

  @Action(LoginUser)
  LoginUser({ patchState }: StateContext<AppStateModel>, { payload }: LoginUser) {

    this.as.login();
    patchState({ user: { ...payload } });
  }


  //* Use authService to log user out
  @Action(LogoutUser)
  LogoutUser({ patchState, getState }: StateContext<AppStateModel>, uid: string) {
    this.as.logout();
    const state = getState();
    patchState({ user: { ...state.user, isAuthenticated: false } });
  }

  //* Actions for Note CRUD

  //* This action first creates the note on firebase and then update the state using the patchState method with the new note as well
  @Action(CreateNote)
  createNote({ getState, patchState }: StateContext<AppStateModel>, { payload }: CreateNote) {
    this.ns.CreateNote();

    const state = getState();
    patchState({ notes: [...state.notes, payload] })

  }

  //* This action fetches single note from the Firestore
  @Action(FetchNote)
  fetchNote({ getState, patchState }: StateContext<AppStateModel>, uid: string) {
    const note = this.ns.fetchNote(uid);

    const state = getState();
    patchState({ notes: [...state.notes, note] })

  }

  @Action(UpdateNote)
  updateNote({ patchState, getState }: StateContext<AppStateModel>, { payload }: UpdateNote) {
    const state = getState();
    this.ns.updateNote();
    //TODO update the note on firestore, and then inside the local store update the specific note only. using filter or something and patch it.

    patchState({ notes: [...state.notes], })
  }
  @Action(DeleteNote)
  deleteNote({ patchState, getState }: StateContext<AppStateModel>, uid: string) {

    const state = getState();

    //TODO send req to delete note from firestore and then also update the local state too

    patchState({ notes: [...state.notes] })
  }


}

