import { CodeInterface } from './code.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

export interface CodeInterface {
  id: string;
  lecturer: string;
  date: string;
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
        this.classCollection = db.collection<CodeInterface>('codes');    
      } else {
        console.log("failed to get user");
        // No user is signed in.
      }


    });

  }



// generateCode():Promise<string> {
//   return new Promise(resolve =>{
//   let text = '';
//   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for(let i=0;i<7;i++)
//   {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return resolve(text);
// } 
// )
// }

  generatorCode() {
    let text = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // let possible = "AB";
    for(let i=0;i<7;i++)
    {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getCode(codeDetails: CodeInterface) {
    // let isNotGenerated:boolean = true;
    return this.db.collection<any>("codes", ref => ref.where('id', '==', codeDetails.id)).valueChanges();
  }


  addCode(codeDetails: CodeInterface) {
    return this.classCollection.doc(codeDetails.id).set(codeDetails);
  }



}










