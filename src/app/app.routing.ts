// Importar componentes y módulos para el routing 
import { Routes, RouterModule  } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {TeamSettingComponent} from './pages/teamSetting/teamsetting.component'
import {HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
 import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms'; 
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 import {ToastModule} from 'ng2-toastr/ng2-toastr';
 import {MemberComponent} from './pages/membership/membership.component'
 import {ApiKeyComponent} from './pages/apiKey/apiKey.component'
 import {MyAccountComponent} from './pages/myAcoount/myAccount.component'
const appRoutes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
 { path: 'teamseting', component: TeamSettingComponent },
 { path: 'membershipdetails', component: MemberComponent },
 { path: 'apikey', component: ApiKeyComponent },
 { path: 'myaccount', component: MyAccountComponent }
];
export const routing = RouterModule.forRoot(appRoutes);