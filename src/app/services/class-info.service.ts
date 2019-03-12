import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ClassList {
  id?: string;
  classCode: string;
  className: string;
  createdBy: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClassInfoService {
  private classCollection: AngularFirestoreCollection<ClassList>;
 
  private classList: Observable<ClassList[]>;
 
  constructor(db: AngularFirestore) {
    this.classCollection = db.collection<ClassList>('classList');
 
    this.classList = this.classCollection.snapshotChanges().pipe(
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
    return this.classCollection.doc<ClassList>(id).valueChanges();
  }
 
  updateTodo(todo: ClassList, id: string) {
    return this.classCollection.doc(id).update(todo);
  }
 
  addTodo(todo: ClassList) {
    return this.classCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.classCollection.doc(id).delete();
  }
}
