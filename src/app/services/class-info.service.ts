import { ClassListInterface } from './class-info.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export interface ClassListInterface {
  id?: string; //subject
  students: any;
  date: string;
  currentTimeMs: any;
}

@Injectable({
  providedIn: 'root'
})

export class ClassInfoService { 

  private classCollection: AngularFirestoreCollection<any>;
  private userID: string = "default";
  private classList: Observable<ClassListInterface[]>;
  
  private currentSubject: string;

  constructor(db: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.userID = user.uid;
        this.classCollection = db.collection<any>('users');
        this.classList = db.collection<any>('users').doc(this.userID).collection<ClassListInterface>('class').doc('id').collection<ClassListInterface>('classCodeDates').valueChanges();    
      } else {
        console.log("failed to get user");
        // No user is signed in.
      }
     


    });

  }

  // getCurrentSubject() {
  //   return this.currentSubject;
  // }

  // setCurrentSubject(sub:string) {
  //   this.currentSubject = sub;
  // }

  getDetail(id) {
    //return this.classCollection.doc<ClassListInterface>(id).valueChanges();
    console.log("get details of: " + id);
    return this.classCollection.doc(this.userID).collection<any>("class").doc<ClassListInterface>("id").collection<ClassListInterface>('classCodeDates').doc<ClassListInterface>(id).valueChanges();
  }
 
  updateDetail(classDetails: ClassListInterface) {
    console.log("update detail");
    return this.classCollection.doc(this.userID).collection<any>("class").doc(classDetails.id).update(classDetails);
  }
 
  addDetail(classDetails: ClassListInterface) {
    console.log("Add detail");
    this.classCollection.doc(this.userID).set({"username":this.userID});
    return this.classCollection.doc(this.userID).collection<any>("class").doc(classDetails.id).set(classDetails);
  }
 
  removeDetail(id) {
    console.log("remove detail")
    return this.classCollection.doc(this.userID).collection<any>("class").doc(id).delete();
  }
}
