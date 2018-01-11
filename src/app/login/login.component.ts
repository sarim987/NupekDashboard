import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';                  
import {  FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FormsModule }   from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ,
]
})
export class LoginComponent implements OnInit {
  users: FirebaseListObservable<any[]>; 
  strValidation: string = '';
  singIndiv=true;
  header=true;
  sidebar=false;
  model: any = {};
  loginStr:string='';
  divSignUp=false;
  forgottenDiv=false;
 
  constructor( 
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,    
    public toastr: ToastsManager,
     vcr: ViewContainerRef,
     private _router: Router,
     private route: ActivatedRoute
  ){  
    this.toastr.setRootViewContainerRef(vcr);
  }
  //Hide Show Div
  forgotePass()
  { 
    this.singIndiv=false;
    this.divSignUp=false;
    this.forgottenDiv=true;
  }
  ngOnInit() {
    //Clear LocalStorage
    localStorage.removeItem('currentUser');
    localStorage.clear();   
      }
  signupData()
  {
    this.singIndiv=false;
    this.divSignUp=true;
    this.forgottenDiv=false;
  } 
  //Login Function
  LoginUser()
  {
    var userDetails={
      userEmail:this.model.email,
      UserPassword:this.model.password
   }
  
   this.loginvalidation();
   if(this.loginStr==''){
       this.afAuth.auth.signInWithEmailAndPassword(userDetails.userEmail, userDetails.UserPassword)
        .then((user) => {
             firebase.database().ref('/users/'+user.uid+'').once('value',  
            function(snapshot) {
              this.users=snapshot.val();
            }.bind(this)
          );
          localStorage.setItem('key', user.uid);
          localStorage.setItem('currentUser', JSON.stringify({ id:user.uid }));
          this._router.navigate(['./myaccount']);
        }).catch(function(error){
         alert('Incorrect Email and Password....');
        })
      }
  }
  //SingUp function
  signUpUser() { 
    this.ValidationRegistartion()
   var userDetails={
        userName:this.model.fullname,
        userEmail:this.model.email,
        userImage:''
     } 
      if(this.strValidation=='')
     {
        this.afAuth.auth.createUserWithEmailAndPassword(this.model.email,this.model.password)
    .then(function(user){
              firebase.database().ref().child("users").child(user.uid).set(userDetails).then(function(ref) {
                alert('Registered Successfully')
              });
 
    }).catch(function(error){
        alert('EmailId Already Exists')
    });
  }
  if(this.strValidation=='' && 0==0)
  {
    this.clear();
    this.singIndiv=true;
    this.divSignUp=false;
    this.ngOnInit();
  }
  }

  //Clear Function
  clear()
  {
    this.model.email='';
    this.model.password=''
    this.model.fullname=''
    this.model.cpassword=''
  }

  //Login Form validation Function
loginvalidation()
{
  if(this.model.email==''  || this.model.email== undefined  || this.model.email==null)
  {
    this.toastr.warning('Email Id is required...');
    this.loginStr=this.strValidation+'Email'
  }
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
  if(!emailReg.test(this.model.email)) {  
    this.toastr.error("Please enter valid email id");
  } 
  else
  {
    this.loginStr='';
  }
  if(this.model.password==''  || this.model.password== undefined  || this.model.password==null)
  {
    this.toastr.warning('password is required...');
    this.loginStr=this.strValidation+'password'
  }
  else
  {
    this.loginStr='';
  }
}

 //Registartion Form Validation Function
  ValidationRegistartion()
  {

    if(this.model.fullname=='' || this.model.fullname== undefined  || this.model.fullname==null  )
    {
      this.toastr.warning('Name is required...');
      this.strValidation=this.strValidation+'Name';
    }
    else
    {
      this.strValidation='';
    }
    if(this.model.email==''  || this.model.email== undefined  || this.model.email==null)
    {
      this.toastr.warning('Email Id is required...');
      this.strValidation=this.strValidation+'Email';
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
    if(!emailReg.test(this.model.email)) {  
      this.toastr.error("Please enter valid email id");
    } 
    else
    {
      this.strValidation='';
    }
    if(this.model.password==''  || this.model.password== undefined  || this.model.password==null)
    {
      this.toastr.warning('password is required...');
      this.strValidation=this.strValidation+'Password';
      this.loginStr=this.strValidation+'password'
    }
    else
    {
      this.strValidation='';
      this.loginStr='';
    }
    if(this.model.cpassword==''  || this.model.cpassword== undefined  || this.model.cpassword==null)
    {
      this.toastr.warning('Conform password is required...');
      this.strValidation=this.strValidation+'Password';
      this.loginStr=this.strValidation+'password'
    }
    else
    {
      this.strValidation='';
      this.loginStr='';
    }
    if(this.model.password.length!=undefined)
    {
    if(this.model.password.length>=6)
    {
      this.strValidation='';
    }
    else
    {
      this.toastr.warning('Enter password character more then 6...');
      this.strValidation=this.strValidation+'Password';
    }
  }
    
    if(this.model.password==this.model.cpassword)
    {
     
      this.strValidation='';
    }
    else
    {
      this.toastr.warning('password is Missmatch...');
      this.strValidation=this.strValidation+'Password';
    }
  }

  //ResetPassword Function
  resetPassword()
  {
    var userDetails={ 
      userEmail:this.model.email,
   }
   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;  
   if(!emailReg.test(this.model.email)) {  
     this.toastr.warning("Please enter valid email id");
   }
   if(this.model.email!=undefined){
   this.afAuth.auth.sendPasswordResetEmail(this.model.email).then(function(user){
    alert('Password Reset Check your Email.....')
        }).catch(function(error){
          alert("Please enter valid email Id !!");
  
    })
  }
  else
  {
    this.toastr.warning("Please enter email id");
  } 
  if(this.model.email!=undefined && 0==0){
    this.model.email='';
  }
  }

  //Cancle Function
  cancleUser()
  {
    this.model.fullname='';
    this.model.email='';
    this.model.password='';
    this.model.cpassword=''
    this.singIndiv=true;
    this.divSignUp=false;
    this.forgottenDiv=false;
  }
}
