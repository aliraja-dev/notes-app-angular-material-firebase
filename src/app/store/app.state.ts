import { State, Action, StateContext, Selector, actionMatcher } from "@ngxs/store";

import { User } from "../interfaces/user.interface";
import { Note } from "../interfaces/note.interface";
import { LoginUser, LogoutUser } from "./app.actions";


export interface AppStateModel {
  user: User;
  notes: Note[]
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    user: {
      name: 'Ali Raja',
      email: 'ali@ali.com',
      uid: 'ashdjsadhsadkjhdsaj',
      isAuthenticated: true
    },
    notes: [{
      title: "my first note",
      body: "Cupidatat mollit deserunt consequat commodo ex. Commodo quis amet quis sunt. Aute pariatur ex ad dolore ex reprehenderit labore dolor mollit nulla velit. Minim exercitation ut tempor laborum qui in esse mollit labore sunt incididunt ex aliqua ullamco. Culpa in tempor consequat tempor fugiat et anim do voluptate ipsum deserunt exercitation incididunt ullamco. Proident elit nostrud eu laboris duis",
      uid: "asjhdsajhashsad",
      authorID: "ashdjsadhsadkjhdsaj"
    },
    {
      title: "my second note",
      body: "Ut labore ea id ea magna eiusmod cillum ea. Excepteur occaecat amet sunt velit incididunt sunt mollit est. Irure irure excepteur deserunt eiusmod.Adipisicing incididunt nisi ullamco adipisicing laboris voluptate culpa.Nisi dolore tempor ipsum do dolor ex ipsum.Proident labore do do dolore excepteur.Sint anim laborum ullamco occaecat cillum reprehenderit ut reprehenderit mollit magna consectetur laborum.",
      uid: "tewuiewiuewyuwery",
      authorID: "ashdjsadhsadkjhdsaj"
    },
    ]
  }
})
export class AppState {
  constructor() {
    //TODO we will put the firebase services here for data fetch and storage

  }

  //* ACTIONS METHODS

  @Action(LoginUser)
  LoginUser({ patchState }: StateContext<AppStateModel>, { payload }: LoginUser) {
    patchState({ user: { ...payload } });
  }

  @Action(LogoutUser)
  LogoutUser({ patchState, getState }: StateContext<AppStateModel>, uid: string) {
    const state = getState();
    patchState({ user: { ...state.user, isAuthenticated: false } });
  }
}

