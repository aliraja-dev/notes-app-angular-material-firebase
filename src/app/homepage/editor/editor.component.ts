import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { Note } from 'src/app/interfaces/note.interface';
import { CreateNote, DeleteNote, UpdateNote } from 'src/app/store/app.actions';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form!: NgForm;
  searchClicked = false;

  selectedNote$: Observable<Note>;
  note: Note;
  selectedNoteSub: Subscription;

  constructor(private store: Store) {
    this.selectedNote$ = this.store.select(state => state.AppState.selectedNote)
  }

  ngOnInit(): void {
    this.selectedNote$.subscribe(note => this.note = note);
  }
  onSearchClicked() {
    this.searchClicked = !this.searchClicked
  }

  onSubmit() {
    const note = { title: this.form.value.title, body: this.form.value.body, uid: this.note.uid }

    //* check if uid exists, true Dispatch UpdateNote Action
    if (!!this.note.uid) {
      console.log('UID exists', this.note.uid);
      this.store.dispatch(new UpdateNote(note));
      return;
    }

    console.log('UID doesnt exist, save new note');
    this.store.dispatch(new CreateNote(
      note
    ))
  }

  //* Delete the note
  onDelete() {
    this.store.dispatch(new DeleteNote(this.note.uid!))
  }

  ngOnDestroy(): void {
    this.selectedNoteSub.unsubscribe();
  }
}
