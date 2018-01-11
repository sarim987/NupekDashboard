import { Component, OnInit, ViewEncapsulation, AfterViewInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {  ParamMap } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';                  
import {  FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { CreditCardValidator } from 'ng2-cc-library';

@Component({
    selector: "app-member",
    templateUrl: "./membership.component.html",
    styleUrls: ['./membership.component.css' 
  ]
})
export class MemberComponent implements OnInit {
    paymentform=false;
    membershiSetting=false;
    UserCreditCardNumber:string='';
    model: any = {};
    items: FirebaseListObservable<any[]>;
    username:string='';
    str: string = '';
    userID:any;
    user:any;
    form: FormGroup;
    submitted: boolean = false;
    cardType:string=''
    constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,    
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
     ) {

      //CrediCard Enter Data  Validation 
      this.form = this._fb.group({
        creditCard: ['', [<any>CreditCardValidator.validateCCNumber]],
        expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
        cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] 
      });
        this.toastr.setRootViewContainerRef(vcr);
    }
   
    ngOnInit() {
     //Chaeck Pyment Details Add OR Not
      if(JSON.parse(localStorage.getItem('currentUser'))==null){
        this._router.navigate(['./login']);
                }
      this.user=JSON.parse(localStorage.getItem('currentUser'))
        this.userID= this.user.id
           
        firebase.database().ref('/payment/'+this.userID+'').once('value',  
        function(snapshot) {
          this.items=snapshot.val();     
          if(this.items==null){
       swal({
           title: 'Oops, you do not have a payment method added',
           text: "Please Add Payment Details!",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, add  it!',
           cancelButtonText: 'No, cancel!',
           confirmButtonClass: 'btn btn-success',
           cancelButtonClass: 'btn btn-danger',
           buttonsStyling: false,
           reverseButtons: true
         }).then((result) => {
           if (result.value) {     
             this.paymentform=true;
           } else if (result.dismiss === 'cancel') {

            this._router.navigate(['./myaccount']);
           }
         })
       }
       else{
           this.paymentform=false;
           this.membershiSetting=true;
           this.UserCreditCardNumber= this.items.CreditCardNumber   
  }
        }.bind(this)
      );    
        }
      
     //Add Payment Function
       AddPaymentDetails()
       {
           this. AddPaymentDetailsvalidation();
           this.onSubmit();
            if(this.cardType ==undefined || this.cardType ==null ||this.cardType ==''  )
           {
            this.toastr.error('Invalid card Type.....')  
            this.str=this.str+'Invalid'; 
           }
           if(this.str==''){ 
               var  AddPaymentdetails={
                   OwnerName:this.model.NameOfOwner,
                  CardName:this.cardType,
                   CreditCardNumber:this.model.CreditCardNumber,
                   ExpiryDate:this.model.ExpiryDate,
                   SecurityCode:this.model.SecurityCode          
                 }
                 firebase.database().ref().child("payment").child(this.userID).set(AddPaymentdetails).then(function(ref) {
                });
                this.toastr.success('Add Card Data Sucessfully.....')   
                this.ngOnInit();
           }
           }

           //Add Payment Details Validation
           AddPaymentDetailsvalidation()
           {
               if(this.model.NameOfOwner=='' || this.model.NameOfOwner== undefined  || this.model.NameOfOwner==null  ) {               
                 this.toastr.warning('Name On Card required...');
                 this.str=this.str+'Name';
               }              
               else{              
                 this.str='';
               }
               if(this.model.CreditCardNumber=='' || this.model.CreditCardNumber== undefined  || this.model.CreditCardNumber==null)
               {
                   this.toastr.warning('CreditCard Number required...');
                   this.str=this.str+'CreditCar';
               }
               else{
                 this.str='';
               }
               if(this.model.SecurityCode=='' || this.model.SecurityCode== undefined  || this.model.SecurityCode==null)
               {
                   this.toastr.warning('Security Number required...');
                   this.str=this.str+'CreditCar';
               }
               else{
                 this.str='';
               }
               if(this.model.ExpiryDate=='' || this.model.ExpiryDate== undefined  || this.model.ExpiryDate==null)
               {
                   this.toastr.warning('Expiry date  required...');
                   this.str=this.str+'CreditCar';
               }
               else{
                 this.str='';
               }
          
           }
          //Check Card Name
          onSubmit() {        
    var re = new RegExp("^4");
    var a=this.model.CreditCardNumber
    if (a.match(re) != null){
    this.cardType='visa'
      }
        // Mastercard 
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(a)) {
      this.cardType='Mastercard'
    }
    // AMEX
    re = new RegExp("^3[47]");
    if (a.match(re) != null)
    this.cardType='AMEX'
       
    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (a.match(re) != null)
        this.cardType='Discover'

    // Diners
    re = new RegExp("^36");
    if (a.match(re) != null)
        this.cardType='Diners'

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (a.match(re) != null)
    this.cardType='Diners - Carte Blanche'
        
    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (a.match(re) != null)
    this.cardType='JCB'
    
    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (a.match(re) != null)
    this.cardType='Visa Electron'
          }

}