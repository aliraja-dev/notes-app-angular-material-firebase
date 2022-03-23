import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { Note } from 'src/app/interfaces/note.interface';
import { NoteSelected } from 'src/app/store/app.actions';
import { AppStateModel } from 'src/app/store/app.state';

@Component({
  selector: 'app-list',

  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  notes$: Observable<Note[]>;
  notes: Note[] = [];
  notesSub: Subscription;

  constructor(private store: Store) {
    this.notes$ = this.store.select(state => state.AppState.notes)
  }

  ngOnInit(): void {
    this.notes$.subscribe(notes => {
      this.notes = [...notes]
    }
    )
  }

  onCreate() {

  }
  openNote(uid: string | undefined) {
    const arrayWithSelectedNote = this.notes.filter(note => note.uid == uid)
    let selectedNote;
    arrayWithSelectedNote.map(note =>
      this.store.dispatch(new NoteSelected(note))
    )
  }
  ngOnDestroy(): void {
    this.notesSub.unsubscribe();
  }
}
