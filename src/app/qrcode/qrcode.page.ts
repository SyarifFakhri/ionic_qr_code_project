import { studentInterface, AddStudentService } from './../services/add-student.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CodeInterface } from '../services/code.service';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})

export class QrcodePage implements OnInit {

  classInfo:CodeInterface = {
    id:"",
    lecturer:"",
    date:Date(),
    subject:"",
    currentTimeMs: 0,
  };

  studentInfo:studentInterface = {
    studentId: "",
    studentName:"",
    date:"",
    lecturerId: "",
    classId: ""
  };


  
  userId:string;
  classCode:string;
  codeDetail: any;
  

  constructor(private nav: NavController, 
    private loadingController: LoadingController,
     private studentService: AddStudentService,
     public db:AngularFirestore,
     public alertController:AlertController
     ) { 
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          this.userId = user.uid;
          // this.classCollection = db.collection<any>('users');
          // db.collection<any>('users').doc(this.userID).collection<ClassListInterface>("class").valueChanges();    
        } else {
          console.log("failed to get user");
          // No user is signed in.
        }
     });
    }

  ngOnInit() {
  }

  async addStudent() {
    const loading = await this.loadingController.create({
      message: 'adding student..'
    });
    await loading.present();
    console.log("inputed code is: ");
    console.log(this.classCode);
    this.studentService.getClassDetail(this.classCode).pipe(first()).subscribe(async data => {
      console.log("getting code details...")
      if (data) {
      this.classInfo = data;
      this.studentService.getStudentDetail(this.userId).subscribe(async userProfileInfo => {
        if (userProfileInfo) {
          // console.log(userProfileInfo);
          console.log("Getting current user details...")
          // this.studentInfo = userProfileInfo; //user profile will return the matric num only
          this.studentInfo.studentId = userProfileInfo.matricNo;
          this.studentInfo.studentName = userProfileInfo.fullName;
          this.studentInfo.lecturerId = this.classInfo.lecturer;
          this.studentInfo.classId = this.classInfo.subject;
          this.studentInfo.date = this.classInfo.date;
          console.log(this.studentInfo.date);

          let allowed = this.compareTimeWithTimeOut(this.classInfo.currentTimeMs, 0, 5, 0);

          if (allowed) {
            this.studentService.addStudent(this.studentInfo).then(() => {
              console.log("adding student...");
              loading.dismiss();
              this.nav.navigateBack('dashboard');
            }); 
          }
          else {
            //show pop up saying it's past the timeout already  
            console.log("timeout!")
            loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Timed Out.',
              subHeader: 'You have timed out. You cannot enter this class anymore',
              message: this.classCode,
              buttons: ['OK']
            });
              
            await alert.present();
          }
        }
        else {
          loading.dismiss();
          console.log("Failed to get user profile -- incorrect code");

        }
    }, userProfileInfoFail => {
      loading.dismiss();
      console.log("Failed to get user profile -- incorrect code");
    });
    }
    else {
      loading.dismiss();
      console.log("failed to get code details -- incorrect code");
      //show alert 
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Incorrect code. Please reenter the code',
        message: this.classCode,
        buttons: ['OK']
      });
        
      await alert.present();
    }
      
  }, data => {
    loading.dismiss();
    console.log("failed to get code - incorrect code");
  });
  }

  compareTimeWithTimeOut(prevDateInMs:number, hour:number, minutes:number, seconds:number) { //hours and minutes is timeout time
    let secondInMs:number = seconds * 1000;
    let minuteInMs:number = minutes * 60 * 1000;
    let hourInMs:number = hour * 60 * 60 * 1000;
    let currentTime:number = Date.now();
    let allowedTime: number = prevDateInMs + hourInMs + minuteInMs + secondInMs
    let timeDiff:number = allowedTime - currentTime;
    console.log("current time:" + currentTime);
    console.log("allowed time: " + allowedTime);
    console.log("time diff: " + timeDiff);
    if (timeDiff  > 0)
    {
      return true;
    } 
    else {
      return false;
    }
  }

}


