import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderNavComponent } from './layout/header-nav/header-nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsideNavComponent } from './layout/aside-nav/aside-nav.component';
import {MemberComponent} from './pages/membership/membership.component'
import {ApiKeyComponent} from './pages/apiKey/apiKey.component'
import {MyAccountComponent} from './pages/myAcoount/myAccount.component'

import {HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
 import { AngularFireDatabaseModule } from 'angularfire2/database';
 import { AngularFireDatabase } from 'angularfire2/database';
 import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; 
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {ToastModule} from 'ng2-toastr/ng2-toastr';
 import { routing } from './app.routing';
 import {TeamSettingComponent} from './pages/teamSetting/teamsetting.component'
 import { AngularFireAuth } from 'angularfire2/auth';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { CreditCardDirectivesModule } from 'ng2-cc-library';
import { BillingComponent } from './pages/billing/billing.component'
import { ScriptLoaderService } from "./_services/script-loader.service";
import { PricingComponent } from './pages/pricing/pricing.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAa56ssObsyQjfdOgfy1ohaUdn9PIqNoYU",
  authDomain: "test-f30f2.firebaseapp.com",
  databaseURL: "https://test-f30f2.firebaseio.com",
  projectId: "test-f30f2",
  storageBucket: "test-f30f2.appspot.com",
  messagingSenderId: "1026741264062"
};
@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    LoginComponent,
    HeaderNavComponent,
    FooterComponent,
    AsideNavComponent,
    TeamSettingComponent,
    MemberComponent,
    ApiKeyComponent,
    MyAccountComponent,
    BillingComponent,
    PricingComponent
   
    // UploadService
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule  ,
    routing,   
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,               
     AngularFireAuthModule    ,
    BrowserAnimationsModule,
     ToastModule.forRoot(),
     NgbModule.forRoot(),
     CreditCardDirectivesModule
  ],
  providers: [  ScriptLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
