import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailComponent } from './component/detail/detail.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { FormComponent } from './component/form/form.component';
import { DoneComponent } from './component/done/done.component';
import { LoginComponent } from './component/login/login.component';
import { ListComponent } from './component/list/list.component';
import { SettingComponent } from './component/setting/setting.component';
import { DateStringPipe } from './pipe/date-string.pipe';
import { connectAuthEmulator } from 'firebase/auth';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    ListComponent,
    DetailComponent,
    LoginComponent,
    SettingComponent,
    DateStringPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.id === 'local') {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.id === 'local') {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.id === 'local') {
        connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
