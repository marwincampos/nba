import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CalendarioApiService } from './servicios/calendarioApi.service';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("108304176003-tb26lngm52p991i86qd9rk283mkn28vi.apps.googleusercontent.com")
  }
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [
    CalendarioApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
