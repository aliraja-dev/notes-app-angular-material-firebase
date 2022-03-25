import { FieldValue, Timestamp } from "firebase/firestore";

export interface Note {
  title?: string;
  body?: string;
  uid?: string;
  userId?: string;
  createdAt?: Date | Timestamp | FieldValue
}

//uid is the notes documents own UID and the userId is the UID of the user who created the document
