import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from "rxjs";
import { Note } from "../interfaces/note.interface";

@Injectable({ providedIn: 'root' })
export class NoteService {
  notesCollectionRef: AngularFirestoreCollection<Note>
  constructor(private afs: AngularFirestore) {

    this.notesCollectionRef = afs.collection('/notes');
  }
  //TODO inject angular fire here and then use this service in the store to manipulate firestore


  CreateNote(payload: Note) {
    //TODO add here the firestore create post method and then return the Id for the note added, that id needs to be added on the user document as well on the firestore and the store as well.
    console.log("create note called", payload);
    this.notesCollectionRef.add(payload);
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
  getAll(): Observable<Note[]> {
    return this.notesCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Note;
          const uid = a.payload.doc.id;
          return { ...data, uid }
        })
      })
    );
  }
}
