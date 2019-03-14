import { ClassListInterface } from './class-info.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ClassListInterface {
  id?: string;
  day: any;
}

@Injectable({
  providedIn: 'root'
})

export class ClassInfoService { 

  private classCollection: AngularFirestoreCollection<any>;
  private userID: string = "lecture0";

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
 
  getTodos() {
    return this.classList;
  }
 
  getTodo(id) {
    //return this.classCollection.doc<ClassListInterface>(id).valueChanges();
    return this.classCollection.doc(this.userID).collection<any>("class").doc<ClassListInterface>(id).valueChanges();
  }
 
  updateTodo(todo: ClassListInterface) {
    return this.classCollection.doc(this.userID).collection<any>("class").doc(todo.id).update(todo);
  }
 
  addTodo(todo: ClassListInterface) {
    this.classCollection.doc(this.userID).set({"username":this.userID});
    return this.classCollection.doc(this.userID).collection<any>("class").doc(todo.id).set(todo);
  }
 
  removeTodo(id) {
    return this.classCollection.doc(id).delete();
  }
}
