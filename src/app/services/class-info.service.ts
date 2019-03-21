import { ClassListInterface } from './class-info.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ClassListInterface {
  id?: string;
  students: any;
  date: number;
}

@Injectable({
  providedIn: 'root'
})

export class ClassInfoService { 

  private classCollection: AngularFirestoreCollection<any>;
  private userID: string = "lecturer1";

  public classList: Observable<ClassListInterface[]>;
  
  constructor(db: AngularFirestore) {
    this.classCollection = db.collection<any>('users');
    this.classList = this.classCollection.doc(this.userID).collection<ClassListInterface>("class").valueChanges();

  }

  getDetail(id) {
    //return this.classCollection.doc<ClassListInterface>(id).valueChanges();
    console.log("get details of: " + id);
    return this.classCollection.doc(this.userID).collection<any>("class").doc<ClassListInterface>(id).valueChanges();
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
    return this.classCollection.doc(id).delete();
  }
}
