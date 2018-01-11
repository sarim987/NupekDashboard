import { Component, OnInit, ViewEncapsulation, AfterViewInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {  ParamMap } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';                  
import {  FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FormsModule }   from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';
import swal from 'sweetalert2'
// 
@Component({
    selector: "app-team",
    templateUrl: "./teamsetting.component.html",
    styleUrls: ['./teamsetting.component.css' ]
})
export class TeamSettingComponent implements OnInit {
    paymentform=false;
    membershiSetting=false;
    UserCreditCardNumber:string='';
    model: any = {};
    items: FirebaseListObservable<any[]>;
    username:string='';
    str: string = '';
    userID:any;
    constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,    
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private _router:Router
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    } 
    ngOnInit() {
        if(JSON.parse(localStorage.getItem('currentUser'))==null){
            this._router.navigate(['./login']);
                    }
    }
    }