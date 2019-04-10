import { LoadingController, AlertController } from '@ionic/angular';
import { ClassListInterface,ClassInfoService } from './../services/class-info.service';
import { CodeInterface,CodeService } from './../services/code.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __generator } from 'tslib';
import * as firebase from 'firebase';
import { first } from 'rxjs/operators';
import { async } from 'q';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { studentInterface } from '../services/add-student.service';


@Component({
  selector: 'app-display-student',
  templateUrl: './display-student.page.html',
  styleUrls: ['./display-student.page.scss'],
})
export class DisplayStudentPage implements OnInit {
  subjects:ClassListInterface[];
  classDetail: ClassListInterface = {
    id: "",
    students: [],
    date: Date()
  };

  subjectId = null;
  dateId:string;
  classCollection: AngularFirestoreCollection<any>;

  private userID: string = "default";

  constructor(private classService:ClassInfoService, 
    private route:ActivatedRoute, 
    private loadingController:LoadingController,
    private db: AngularFirestore,
    private codeserv: CodeService,
    public alertController: AlertController) { 
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          this.userID = user.uid;  
          this.classCollection=db.collection<any>('users');
        } else {
          console.log("failed to get user");
          // No user is signed in.
        }
      });
  
    }

  ngOnInit() {
    //this.classId = this.route.snapshot.params['id'];
    this.dateId = this.route.snapshot.params['date'];
    this.subjectId = this.route.snapshot.params['subject'];
    console.log("date", this.dateId)
    console.log("SUBJECT:", this.subjectId)
    if (this.dateId && this.subjectId)  {
      
      this.loadClassInfo();
    }
  }

  async loadClassInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();
  //   setTimeout(() => {
  //     console.log("timeout")
  //     loading.dismiss();
  //  }, 5000);
    // console.log("class id:", this.subjectId)

    this.classCollection.doc(this.userID)
    .collection<ClassListInterface>("class")
    .doc<ClassListInterface>(this.subjectId)
    .collection<any>("classCodeDates")
    .doc<ClassListInterface>(this.dateId)
    .valueChanges().subscribe( res => {
      console.log(res)
      this.classDetail = res;
      loading.dismiss();
      
    });
    
  }

}
