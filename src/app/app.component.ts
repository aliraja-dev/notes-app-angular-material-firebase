import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Store } from '@ngxs/store';
import { Subscription, switchMap, take, tap } from 'rxjs';

import { NoteService } from './services/note.service';
import { GetAllNotes, LoginUser } from './store/app.actions';
import { User } from './interfaces/user.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSub: Subscription;

  constructor(private store: Store,
    private ns: NoteService,
    public auth: AngularFireAuth
  ) { }
  title = 'notepad-app';

  //* load notes from the Firestore, and then unsub using take(1) operator from rxjs
  ngOnInit(): void {
    //
    this.ns.getAllNotesForAuthUser().pipe(take(1)).subscribe(notes => {
      console.log("notes from db", notes)
      this.store.dispatch(new GetAllNotes(notes));
    });
    this.userSub = this.loadUserInAppState().subscribe();
  }

  //* check if the user is already logged in and then load that in state on every App INIT otherwise show Login Popup
  loadUserInAppState() {
    return this.auth.authState.pipe(
      tap((user) => {
        if (user) {
          // console.log('user logged in', user)
          this.createUserObjectInState(user);
        }
        else {
          this.onLogin();
        }
      })
    )
  }
  onLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      //* authenticated user
      user => {
        this.createUserObjectInState(user)
      }
    ).catch(error => console.log("User not logged In", error))
  }
  onLogOut() {
    this.auth.signOut();
  }


  createUserObjectInState(user: any) {
    const userForState: User = {
      name: user.displayName,
      email: user.email,
      pictureUrl: user.photoURL,
      uid: user?.uid
    }
    this.store.dispatch(new LoginUser(userForState))
    return userForState;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
