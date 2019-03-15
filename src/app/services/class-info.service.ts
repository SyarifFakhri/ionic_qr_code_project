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

  private classList: Observable<ClassListInterface[]>;
  
  constructor(db: AngularFirestore) {

    this.classCollection = db.collection<any>('users');
    
    //this.classList = this.classCollection.snapshotChanges().pipe(
    this.classList = this.classCollection.doc(this.userID).collection<any>("class").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getDetails() {
    return this.classList;
  }
 
  getDetail(id) {
    //return this.classCollection.doc<ClassListInterface>(id).valueChanges();
    return this.classCollection.doc(this.userID).collection<any>("class").doc<ClassListInterface>(id).valueChanges();
  }
 
  updateDetail(classDetails: ClassListInterface) {
    return this.classCollection.doc(this.userID).collection<any>("class").doc(classDetails.id).update(classDetails);
  }
 
  addDetail(classDetails: ClassListInterface) {
    this.classCollection.doc(this.userID).set({"username":this.userID});
    return this.classCollection.doc(this.userID).collection<any>("class").doc(classDetails.id).set(classDetails);
  }
 
  removeDetail(id) {
    return this.classCollection.doc(id).delete();
  }
}
