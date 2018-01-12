import { Component } from '@angular/core';
 import { FormsModule }   from '@angular/forms';
 import { AngularFireModule } from 'angularfire2';
 import { AngularFireAuthModule } from 'angularfire2/auth';
  import { AngularFireDatabaseModule } from 'angularfire2/database';
  import {Helpers} from "./helpers";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
