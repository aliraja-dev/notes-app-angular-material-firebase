export interface User {
  name?: string | null;
  email?: string | null;
  uid?: string | null;
  pictureUrl?: string | null;
  isAuthenticated?: boolean,
  notes?: [
    { title: string, date: Date, noteId: string }
  ],
}
