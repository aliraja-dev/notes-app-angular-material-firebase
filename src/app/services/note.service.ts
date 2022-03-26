import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { serverTimestamp } from "firebase/firestore";
import { Observable, map, switchMap } from "rxjs";
import { Note } from "../interfaces/note.interface";

@Injectable({ providedIn: 'root' })
export class NoteService {
  notesCollectionRef: AngularFirestoreCollection<Note>
  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {

    this.notesCollectionRef = afs.collection('/notes');
  }
  //TODO inject angular fire here and then use this service in the store to manipulate firestore


  async CreateNote(payload: Note) {
    //TODO add here the firestore create post method and then return the Id for the note added, that id needs to be added on the user document as well on the firestore and the store as well.

    const user = await this.afa.currentUser;

    return this.notesCollectionRef.add({
      ...payload,
      userId: user?.uid,
      createdAt: serverTimestamp()
    });
  }


  fetchNote(uid: string) {
    //? not used so far to fetch a single note, we can use this if we want to share notes

  }


  updateNote(note: Note) {
    console.log("update note method from ns service called", note.uid)
    //TODO update the note on firestore and return a success
    return this.notesCollectionRef.doc(note.uid).update(note);
  }

  deleteNote(uid: string) {
    return this.notesCollectionRef.doc(uid).delete();
  }

  //* Fetches all notes from /notes collection at startup, used in App comp

  getAllNotesForAuthUser(): Observable<Note[]> {
    return this.afa.authState.pipe(
      switchMap(
        user => {
          if (user) {

            return this.afs.collection<Note[]>(
              '/notes', ref =>
              ref.where('userId', '==', user.uid).orderBy('createdAt')
            ).valueChanges({ idField: 'uid' });
          }
          else {
            console.log("user not logged in");
            return [];
          }
        }
      )
    )
  }
}
