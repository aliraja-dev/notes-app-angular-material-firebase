import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Store } from '@ngxs/store';
import { Observable, Subscription, switchMap, take, tap } from 'rxjs';

import { NoteService } from './services/note.service';
import { GetAllNotes, LoginUser, LogoutUser } from './store/app.actions';
import { User } from './interfaces/user.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  public user: Observable<User>;
  constructor(private store: Store,
    private ns: NoteService,
    public auth: AngularFireAuth
  ) { }
  title = 'notepad-app';

  //* load notes from the Firestore, and then unsub using take(1) operator from rxjs
  ngOnInit(): void {
    //* Load loggedIn user in AppState
    this.userSub = this.loadUserInAppState().subscribe();
    //* Load all Notes for the loggedIn User from Firestore in AppState

    this.ns.getAllNotesForAuthUser().pipe(take(1)).subscribe(notes => {
      this.store.dispatch(new GetAllNotes(notes));
    });

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
          // this.onLogin();
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
    console.log("logout was called")
    this.auth.signOut();
    this.store.dispatch(new LogoutUser());
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
