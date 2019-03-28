import { CodeInterface } from './code.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { promise } from 'protractor';
import { reject } from 'q';
import { resolve } from 'path';


export interface CodeInterface {
  id: string;
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
        this.classCollection = db.collection<CodeInterface>('codes');    
      } else {
        console.log("failed to get user");
        // No user is signed in.
      }


    });

  }



generateCode():Promise<string> {
  return new Promise(resolve =>{
  let text = '';
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(let i=0;i<7;i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return resolve(text);
} 
)
}

// generatorCode() {
//   let text = '';
//   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for(let i=0;i<7;i++)
//   {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

addCode(codeDetails: CodeInterface){
  let isNotGenerated:boolean = true;
  // let generatedCode:string = null;
  this.generateCode().then(text => {
    console.log(text);
    codeDetails.id=text;
    this.db.collection<any>("codes", ref => ref.where(
      'id', '==', text
    )).valueChanges().subscribe(
      data => { 
        if (data.length > 0) {
          //return nothing
          //added comment
          console.log(data);
          console.log("not created")
        }
        else if (data.length == 0){
          console.log(data);
          console.log(text);
          console.log("created");
          this.classCollection.doc(text).set(codeDetails);
        }
      }
    )

  })


      // this.generateCode().then(text => {
      //   console.log(text);
  //     this.db.collection<CodeInterface>("codes", ref => ref.where('id', '==', generatedCode)).valueChanges().subscribe(
  // data => {
  //   if (data) {
  //     console.log("code " + generatedCode + "is taken. Regenerating..."); 
  //   }
  //   else if (!data) {
  //       console.log("Code generated succesfully: " + generatedCode);
  //       isNotGenerated = false;
  //   }
    // });
  // }
}
}










