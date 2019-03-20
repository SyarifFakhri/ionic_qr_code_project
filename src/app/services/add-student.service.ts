import { studentInterface } from './add-student.service';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

export interface studentInterface {
  studentId: string;
  lecturerId: string;
  classId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AddStudentService {
  
  private classCollection: AngularFirestoreCollection<any>;
  constructor(db: AngularFirestore) {
    this.classCollection = db.collection('users');
   }
  
  addStudent(studentDetails: studentInterface) {
    return this.classCollection.doc(studentDetails.lecturerId).collection<any>("class").doc(studentDetails.classId).update({
      students: firebase.firestore.FieldValue.arrayUnion(studentDetails.studentId)
    })
  }  
}

