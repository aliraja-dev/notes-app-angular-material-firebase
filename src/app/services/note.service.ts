import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { collection } from "firebase/firestore";

import { Note } from "../interfaces/note.interface";

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor() { }
  //TODO inject angular fire here and then use this service in the store to manipulate firestore


  CreateNote() {
    //TODO add here the firestore create post method and then return the Id for the note added, that id needs to be added on the user document as well on the firestore and the store as well.

  }

  fetchNote(uid: string) {

    //TODO setup http here and get records from firebase

    return { title: "from service", body: "body of note", uid: "jhsdjkhfsdhf", authorId: "ajsdhjshd" };

  }


  updateNote() {

    //TODO update the note on firestore and return a success

  }
}
