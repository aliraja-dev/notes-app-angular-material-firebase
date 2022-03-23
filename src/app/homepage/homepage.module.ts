import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { ListComponent } from './list/list.component';
import { EditorComponent } from './editor/editor.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/shared.module';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {
    path: '', component: HomepageComponent,
    // children: [
    //   // { path: '', component: EmptyComponent },
    //   // { path: 'new', component: EditorComponent },
    //   // { path: 'edit/:id', component: EditorComponent }
    // ]
  },

]

@NgModule({
  declarations: [
    EmptyComponent,
    HomepageComponent,
    ListComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class HomepageModule { }
