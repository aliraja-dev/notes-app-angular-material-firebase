import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Store } from '@ngxs/store';
import { take } from 'rxjs';

import { NoteService } from './services/note.service';
import { GetAllNotes, LoginUser } from './store/app.actions';
import { User } from './interfaces/user.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store,
    private ns: NoteService,
    public auth: AngularFireAuth
  ) { }
  title = 'notepad-app';

  //* load notes from the Firestore, and then unsub using take(1) operator from rxjs
  ngOnInit(): void {
    this.ns.getAll().pipe(take(1)).subscribe(notes => {
      this.store.dispatch(new GetAllNotes(notes));
    });

  }


  onLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      //* authenticated user
      //TODO load this user into our Store
      userData => {
        this.loadUserInAppState();
      }
    ).catch(error => console.log(error))
  }
  onLogOut() {
    this.auth.signOut();
  }

  loadUserInAppState() {
    const user = firebase.auth().currentUser;
    const userForState: User = {
      name: user?.displayName,
      email: user?.email,
      pictureUrl: user?.photoURL,
      uid: user?.uid
    }

    this.store.dispatch(new LoginUser(userForState))

  }
}
