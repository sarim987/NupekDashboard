import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {  ParamMap } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';                  
import {  FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FormsModule }   from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { ActivatedRoute, Router } from '@angular/router';
declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    styleUrls: ['./header-nav.componenet.css' 
]
})
export class HeaderNavComponent implements OnInit {
    items: FirebaseListObservable<any[]>;
    username:string=''
    constructor( public afAuth: AngularFireAuth,
        public af: AngularFireDatabase,    
        public toastr: ToastsManager,
            private route: ActivatedRoute,
            private _router: Router,
        ) {

    }
    ngOnInit() {
       // Get Locastorage Id and Bind User Data
        let user=JSON.parse(localStorage.getItem('currentUser'))
        if(JSON.parse(localStorage.getItem('currentUser'))==null){
            this._router.navigate(['./login']);
                    }
        firebase.database().ref('/users/'+user.id+'').once('value',  
        function(snapshot) {
          this.items=snapshot.val();
          this.username=this.items.userName;
        }.bind(this)
      );
    }
    Logout()
    {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this._router.navigate(['./login']);
    }

}