import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/compat/auth-guard';

import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { DoneComponent } from './done/done.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'done', component: DoneComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
