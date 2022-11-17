import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';

import { IndexModule } from "./components/index.module";
import { IndexComponent } from './components/index.component';

import { InventoryModule } from "./components/inventory/inventory.module";
import { AddEditComponent } from './components/inventory/add_edit.component';
import { ListComponent } from './components/inventory/list.component';

import { AuthGuard } from './components/auth/auth.guard';
import { AuthModule } from './components/auth/auth.module';
import { SignInComponent } from './components/auth/signin.component';
import { SignUpComponent } from './components/auth/signup.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    IndexModule,
    InventoryModule,
    AuthModule,
    RouterModule.forRoot([
      { path: "", component: IndexComponent},
      { path: "inventory/list", component: ListComponent },
      { path: "inventory/:mode", component: AddEditComponent, canActivate: [AuthGuard]},
      { path: "inventory/:mode/:id", component: AddEditComponent, canActivate: [AuthGuard] },
      { path: "users/signin", component: SignInComponent},
      { path: "users/signup", component: SignUpComponent},
      { path: "**", redirectTo: ""}
    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
