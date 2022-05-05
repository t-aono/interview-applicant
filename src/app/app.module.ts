import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailComponent } from './component/detail/detail.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MediaUrlPipe } from './pipe/media-url.pipe';
import { FormComponent } from './component/form/form.component';
import { DoneComponent } from './component/done/done.component';
import { LoginComponent } from './component/login/login.component';
import { ListComponent } from './component/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    ListComponent,
    DetailComponent,
    LoginComponent,
    DoneComponent,
    MediaUrlPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
