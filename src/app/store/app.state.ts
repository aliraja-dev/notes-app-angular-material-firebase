import { State, Action, StateContext, Selector, actionMatcher, Select } from "@ngxs/store";

import { User } from "../interfaces/user.interface";
import { Note } from "../interfaces/note.interface";
import { DeleteNote, FetchNote, GetAllNotes, LoginUser, LogoutUser, NoteSelected, UpdateNote } from "./app.actions";
import { AuthService } from "../services/auth.service";
import { NoteService } from "../services/note.service";
import { CreateNote } from "./app.actions";
import { Injectable } from "@angular/core";

export interface AppStateModel {
  user: User;
  notes: Note[],
  selectedNote: Note;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    user: {},
    notes: [],
    selectedNote: { title: '', body: '', uid: '' }
  }
})
@Injectable()
export class AppState {
  constructor(
    private as: AuthService,
    private ns: NoteService
  ) { }

  //* Get All Notes for the User
  @Selector()
  static getNotes(state: AppStateModel) {
    return state.notes;
  }

  //* ACTIONS METHODS

  //* Use authService to log user in

  @Action(LoginUser)
  LoginUser({ patchState }: StateContext<AppStateModel>, { payload }: LoginUser) {
    console.log('user logged in ', payload)
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
  createNote({ getState, patchState, dispatch }: StateContext<AppStateModel>, { payload }: CreateNote) {
    const state = getState();
    this.ns.CreateNote(payload).then(
      res => {
        patchState({ notes: [...state.notes, { ...payload, uid: res.id }] })
      }
    ).catch(e => console.log(e))
  }

  //* This action fetches single note from the Firestore
  @Action(FetchNote)
  fetchNote({ getState, patchState }: StateContext<AppStateModel>, uid: string) {
    const note = this.ns.fetchNote(uid);
    const state = getState();
    patchState({ notes: [] })
  }

  @Action(UpdateNote)
  updateNote({ patchState, getState, dispatch }: StateContext<AppStateModel>, { payload }: UpdateNote) {
    const state = getState();
    //TODO match the note, and then update it with the payload title and body
    const withoutUpdatedNoteState = state.notes.filter(note => note.uid != payload.uid);
    console.log("payload in state", payload.uid)
    this.ns.updateNote(payload).then(
      _ => patchState({ notes: [...withoutUpdatedNoteState, payload] })
    ).catch(error => console.log(error));


  }


  @Action(DeleteNote)
  deleteNote({ patchState, getState, dispatch }: StateContext<AppStateModel>, { uid }: DeleteNote) {
    const state = getState();
    //* filter the note from local state
    const modifiedNoteState = state.notes.filter(note => note.uid != uid)
    this.ns.deleteNote(uid).then(_ =>
      patchState({ notes: [...modifiedNoteState] })
    ).catch(e => console.log(e))
    //* after deleting the note, the noteSelected state is set to empty
    return dispatch(new NoteSelected({ title: '', body: '', uid: '' }))
  }

  @Action(GetAllNotes)
  getAllNotes({ patchState, getState }: StateContext<AppStateModel>, { payload }: GetAllNotes) {
    const state = getState();
    patchState({ notes: [...state.notes, ...payload] })
  }

  //* NOTE SELECTED
  @Action(NoteSelected)
  noteSelected({ patchState }: StateContext<AppStateModel>, { payload }: NoteSelected) {
    patchState({ selectedNote: payload })
  }
}

