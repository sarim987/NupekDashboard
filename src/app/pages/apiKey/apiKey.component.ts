import { Component, OnInit, ViewEncapsulation, AfterViewInit,ViewContainerRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database'; 
import {  FirebaseListObservable  } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FormsModule }   from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import "firebase/storage";
import * as $ from 'jquery';
import { strictEqual } from 'assert';
@Component({
    selector: "app-apiKey",
    templateUrl: "./apiKey.component.html",
    styleUrls:["./apiKey.component.css"
  ]
})
export class ApiKeyComponent implements OnInit {
     selectedFiles: FileList;
    model: any = {};
    closeResult:string=''
    userID:string='';
    uniqueKeyID:string=''
    companyData: any[] = [];
     strValidation:string='';
    private basePath:string = '/uploads';
     constructor(
        private modalService: NgbModal,
        public afAuth: AngularFireAuth,
        public af: AngularFireDatabase,    
        public toastr: ToastsManager,
         vcr: ViewContainerRef,
         private _router: Router,
         private route: ActivatedRoute
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    //Regnrate Key Function
    regenerateKey(item)
    {
      this.uniqueKey();
      firebase.database().ref().child("companies").child(this.userID).child(item.$id).update({
        ApiKey:this.uniqueKeyID
      })
      this.ngOnInit();
    }

    //Detect Select File 
    detectFiles(event) {
      this.selectedFiles = event.target.files;        
  }
    ngOnInit() {
      //Check Current User Are Login Or Not
      if(JSON.parse(localStorage.getItem('currentUser'))==null){
        this._router.navigate(['./login']);
                }
      this.companyData=[];
      this. bindCompaniesData();
     }

     //Copy Key Function
     copyKey(item)
     {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(item.ApiKey).select();
      document.execCommand("copy");
      $temp.remove();
     }

     //Bind Companies Data
     bindCompaniesData()
     {
     this.userID= JSON.parse(localStorage.getItem('currentUser')).id
      firebase.database().ref('/companies/'+ this.userID+'').once('value',  
      function(snapshot) {
       this.items=snapshot.val()
       snapshot.forEach(snapshot => {
          var  AllData={
            $id:snapshot.key,
            CompanyName:snapshot.val().CompanyName,
            CompanyURL:snapshot.val().CompanyURL,
            CompanyImageURL:snapshot.val().CompanyImageURL,
            CompanyImageName:snapshot.val().CompanyImageName,
            ApiKey:snapshot.val(). ApiKey
          }
          this.companyData.push(AllData)
        });       
       }.bind(this));
     }
     
     //Unique Key Function
   uniqueKey()
  {
    var a= '_' + Math.random().toString(36).substr(2, 30);
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     var ID_LENGTH = 15;            
    var rtn = '';
     for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
      this.uniqueKeyID=rtn+a;
      }  
      
      //Add Company Details
    addCompany()
    {   
       this.addCompanyValidation();
      if(this.strValidation==''){
      let file = this.selectedFiles.item(0)
      this.pushUpload(file); 
    }      
    }

    //Push Image In Firebase Storage
    pushUpload(file) {   
      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${this.basePath}/${file.name}`).put(file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
         },
        (error) => {
          // upload failed
          alert(error)
        },
        () => {
          // upload success
          file.url = uploadTask.snapshot.downloadURL
          var name=file.name
          this.saveFileData(file.url,name)
        }
      );
    }

    //Push File DEtails Add In Firebase
    saveFileData(url,name) {  
      this.uniqueKey();
      var companyDetails={
        CompanyName:this.model.companyName,
        CompanyURL:this.model.companyURL,
        CompanyImageURL:url,
        CompanyImageName:name,
        ApiKey:this.uniqueKeyID,       
     }
     this.userID= JSON.parse(localStorage.getItem('currentUser')).id
    firebase.database().ref().child("companies").child(this.userID).push(companyDetails).then(function(ref) {
       alert('Add Comany Done!')
       window.location.reload();
      
    });
   
   }


   //Open And Close Model
    open(content,i) {  
        this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          alert(reason)
        });
      
    }
      private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

      //Add Company Detaile Validation
      addCompanyValidation()
      {
        if(this.model.companyName=='' || this.model.companyName== undefined  || this.model.companyName==null)
        {
            this.toastr.warning('Company Name Required...');
            this.strValidation=this.strValidation+'Company';
        }
        else{
          this.strValidation='';
        }
        if(this.model.companyURL=='' || this.model.companyURL== undefined  || this.model.companyURL==null)
        {
            this.toastr.warning('URL Required...');
            this.strValidation=this.strValidation+'CreditCar';
        }
        else{
          this.strValidation='';
        }
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (!re.test(this.model.companyURL)) { 
          this.toastr.warning('Invalid URL ...');
          this.strValidation=this.strValidation+'CreditCar';
        }
        else{
          this.strValidation='';
        }
        if(this.selectedFiles== undefined)
        {
            this.toastr.warning('Select Image...');
            this.strValidation=this.strValidation+'CreditCar';
        }
        else{
          this.strValidation='';
        }

      }     
   
}