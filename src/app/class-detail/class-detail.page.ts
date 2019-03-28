import { LoadingController } from '@ionic/angular';
import { ClassListInterface,ClassInfoService } from './../services/class-info.service';
import { CodeInterface,CodeService } from './../services/code.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __generator } from 'tslib';
import * as firebase from 'firebase';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  classDetail: ClassListInterface = {
    id: "",
    students: [],
    date: 0
  };

  codeDetail: CodeInterface = {
      lecturer:"",
      id:"",
      subject:"",
      date:0
  };
  
  classId = null;

  private userID: string = "default";

  constructor(private classService:ClassInfoService, 
    private route:ActivatedRoute, 
    private loadingController:LoadingController,
    private codeserv: CodeService) { 
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



  
  async codeGenerator() {
    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();
    this.codeDetail.lecturer=this.userID;
    this.codeDetail.subject=this.classId;
    this.codeserv.addCode(this.codeDetail).then(res => {
      loading.dismiss();
      // this.classInfo = res;
    });
    
    // this.codeserv.addCode(this.codeDetail)


  }
  
  

}

