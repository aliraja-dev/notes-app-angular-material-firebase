import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';

const modules = [
  FlexLayoutModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  TextFieldModule,
  MatInputModule

]


@NgModule({

  imports: [
    ...modules
  ],
  exports: [...modules]
})
export class MaterialModule { }
