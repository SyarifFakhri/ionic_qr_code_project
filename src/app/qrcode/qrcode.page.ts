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
    date:0,
    subject:""
  };

  studentInfo:studentInterface = {
    studentId: "",
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
        this.studentInfo.lecturerId = this.classInfo.lecturer;
        this.studentInfo.classId = this.classInfo.subject;

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

}


