import { CodeInterface } from './code.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';


export interface CodeInterface {
  id?: string;
  lecturer: string;
  date: number;
  subject: string;
}


@Injectable({
  providedIn: 'root'
})
export class CodeService {

  private classCollection: AngularFirestoreCollection<any>;
  private userID: string = "default";

  constructor(public db: AngularFirestore) { 

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.userID = user.uid;
        this.classCollection = db.collection<any>('codes');    
      } else {
        console.log("failed to get user");
        // No user is signed in.
      }


    });

  }


generateCode() {

  let text = '';
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(let i=0;i<length;i++)
  {
    text += possible.charAt(Math.floor(Math.random()* possible.length));
  }

  return text;
}

addCode(codeDetails: CodeInterface){
  let isNotGenerated:boolean = true;
  while (isNotGenerated) {
  let text=this.generateCode();
  this.db.collection<CodeInterface>("codes", ref => ref.where('id', '==', "1234567")).valueChanges().subscribe(
    data => {
      if (data) {
        //NOTHING
      }
      else if (!data) {
          this.classCollection
          isNotGenerated = false;
      }
    }
  );
  }

}

}






