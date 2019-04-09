import { studentInterface } from './add-student.service';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { defineBase } from '@angular/core/src/render3';

export interface studentInterface {
  studentId: string;
  studentName:string;
  date:string;
  lecturerId: string;
  classId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AddStudentService {
  
  private classCollection: AngularFirestoreCollection<any>;
  constructor(public db: AngularFirestore) {
    this.classCollection = db.collection('users');
   }
  
  getClassDetail(classCode:string) {
    return this.db.collection<any>("codes").doc<any>(classCode).valueChanges();
  }

  getStudentDetail(userId:string){
    return this.db.collection<any>("userProfile").doc<any>(userId).valueChanges();
  }
  
  addStudent(studentDetails: studentInterface) {
    return this.classCollection
    .doc(studentDetails.lecturerId)
    .collection<any>("class")
    .doc(studentDetails.classId)
    .collection<any>("classCodeDates")
    .doc(studentDetails.date).update({
    students: firebase.firestore.FieldValue.arrayUnion(studentDetails.studentId+'\xa0\xa0\xa0\xa0'+studentDetails.studentName)
    })
  }  
}

