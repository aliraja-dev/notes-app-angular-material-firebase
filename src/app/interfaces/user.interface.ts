export interface User {
  name?: string;
  email?: string;
  uid?: string;
  isAuthenticated?: boolean,
  notes?: [
    { title: string, date: Date, noteId: string }
  ],
}
