import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';

import { NoteService } from './services/note.service';
import { GetAllNotes } from './store/app.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private ns: NoteService) { }
  title = 'notepad-app';

  //* load notes from the Firestore, and then unsub using take(1) operator from rxjs
  ngOnInit(): void {
    this.ns.getAll().pipe(take(1)).subscribe(notes => {
      this.store.dispatch(new GetAllNotes(notes));
    });
  }
}
