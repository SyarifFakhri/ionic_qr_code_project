import { studentInterface, AddStudentService } from './../services/add-student.service';
import { NavController, LoadingController } from '@ionic/angular';
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
    subject:""
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
  

  constructor(private nav: NavController, 
    private loadingController: LoadingController,
     private studentService: AddStudentService,
     public db:AngularFirestore) { 
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
    this.studentService.getClassDetail(this.classCode).pipe(first()).subscribe(data => {
      this.classInfo = data;
      this.studentService.getStudentDetail(this.userId).subscribe(userProfileInfo => {
        // this.studentInfo = userProfileInfo; //user profile will return the matric num only
        this.studentInfo.studentId = userProfileInfo.matricNo;
        this.studentInfo.studentName = userProfileInfo.fullName;
        this.studentInfo.lecturerId = this.classInfo.lecturer;
        this.studentInfo.classId = this.classInfo.subject;
        this.studentInfo.date = this.classInfo.date;
        console.log("Previous time: ", this.studentInfo.date);
        let allowedTime = Date();
        // allowedTime.setMinutes(allowedTime.getMinutes() + 30)
        console.log("current time + 30:", allowedTime)

        this.studentService.addStudent(this.studentInfo).then(() => {
          loading.dismiss();
          this.nav.navigateBack('dashboard');
        });
    });
  });
    // this.studentService.addStudent(this.studentInfo).then(() => {
    //   loading.dismiss();
    //   this.nav.navigateBack('dashboard');
    // });
    
  }

  compareTimeWithTimeOut(prevDate:string, hour:number, minutes:number) {
    let currentTime = Date();
    

  }

  parseDateDay(dateStr:string) {
    let splitStr = dateStr.split(' '); 
    return splitStr[0] //return day
  }

  parseDateHour(dateStr:string) {
    let splitStr = dateStr.split(' '); //split according to space
    let splitTime = splitStr[4].split(':');
    return splitTime[0] //hours
  }

  parseDateMinute(dateStr:string){
    let splitStr = dateStr.split(' '); //split according to space
    let splitTime = splitStr[4].split(':');
    return splitTime[1] //minutes
  }

}


