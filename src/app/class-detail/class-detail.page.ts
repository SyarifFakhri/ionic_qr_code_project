import { LoadingController, AlertController } from '@ionic/angular';
import { ClassListInterface,ClassInfoService } from './../services/class-info.service';
import { CodeInterface,CodeService } from './../services/code.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __generator } from 'tslib';
import * as firebase from 'firebase';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  classDetail: ClassListInterface = {
    id: "",
    students: [],
    date: Date()
  };

  codeDetail: CodeInterface = {
      lecturer:"",
      id:"",
      subject:"",
      date: Date()
  };
  
  classId = null;
 

  

  private userID: string = "default";

  constructor(private classService:ClassInfoService, 
    private route:ActivatedRoute, 
    private loadingController:LoadingController,
    private codeserv: CodeService,
    public alertController: AlertController) { 
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          this.userID = user.uid;  
        } else {
          console.log("failed to get user");
          // No user is signed in.
        }
      });
  
    }

  ngOnInit() {
    this.classId = this.route.snapshot.params['id'];

    if (this.classId)  {
      this.loadClassInfo();
    }
  }

  async loadClassInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();
    this.classService.getDetail(this.classId).subscribe(res => {
      loading.dismiss();
      this.classDetail = res;
      console.log(res);

      
    });
  }

  // getDate() {
  //   return this.codeDetail.date;
  // }



  
  async codeGenerator() {
    const loading = await this.loadingController.create({
      message: 'Generating code..'
    });

    await loading.present();
    this.codeDetail.lecturer=this.userID;
    this.codeDetail.subject=this.classId;
    //this.codeDetail.date
    this.codeDetail.id = this.codeserv.generatorCode();
    

    this.codeserv.getCode(this.codeDetail).pipe(first()).subscribe(data => {
      
          if (data.length > 0) {
            console.log(data);
            console.log("Data already exists, so not created, recalling function again");
            loading.dismiss();
            this.codeGenerator();
          }
          else if (data.length == 0) {
            console.log(data);
            console.log("created");
            this.codeserv.addCode(this.codeDetail).then(async () => {
              loading.dismiss();
              
              const alert = await this.alertController.create({
                header: 'Class code',
                subHeader: 'Give this to your students',
                message: this.codeDetail.id,
                buttons: ['OK']
              }); 
          
              await alert.present();
            });
          }

         


        });
    
    // this.codeserv.addCode(this.codeDetail)
    }
}

