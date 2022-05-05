import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/compat/auth-guard';

import { DetailComponent } from './component/detail/detail.component';
import { AuthGuard } from './guard/auth.guard';
import { FormComponent } from './component/form/form.component';
import { DoneComponent } from './component/done/done.component';
import { LoginComponent } from './component/login/login.component';
import { ListComponent } from './component/list/list.component';

const routes: Routes = [
  { path: '', component: FormComponent },
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
