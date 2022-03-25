import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { Note } from 'src/app/interfaces/note.interface';
import { CreateNote, DeleteNote, NoteSelected, UpdateNote } from 'src/app/store/app.actions';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form!: NgForm;
  selectedNote$: Observable<Note>;
  note: Note;
  selectedNoteSub: Subscription;

  constructor(private store: Store) {
    this.selectedNote$ = this.store.select(state => state.AppState.selectedNote)
  }

  ngOnInit(): void {
    this.selectedNote$.subscribe(note => this.note = note);
  }

  onNewNote() {
    this.store.dispatch(new NoteSelected({ title: '', body: '', userId: '' }))
  }

  onSave() {
    const note = { title: this.form.value.title, body: this.form.value.body }

    //* check if uid exists, true Dispatch UpdateNote Action
    if (!!this.note.uid) {
      console.log('UID exists', this.note.uid);

      this.store.dispatch(new UpdateNote({ ...note, uid: this.note.uid }));
      return;
    }
    if (note.title) {
      //* if there is a title only then create a new note
      console.log('UID doesnt exist, save new note');

      this.store.dispatch(new CreateNote(
        note
      ))

    } else {
      //TODO update Ui with error
      console.log("please enter a title to save the note");
    }

  }

  //* Delete the note
  onDelete() {
    if (this.note.uid) {
      this.store.dispatch(new DeleteNote(this.note.uid))
    }
  }

  ngOnDestroy(): void {
    this.selectedNoteSub.unsubscribe();
  }
}
