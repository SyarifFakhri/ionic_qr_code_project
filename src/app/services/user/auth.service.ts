// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

    
  constructor() {}//this.loginUser();this.signupUser;this.resetPassword;this.logoutUser
  // loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
  //   return firebase.auth().signInWithEmailAndPassword(email, password);
  // }
  
  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);

    
  }
  signupUser(email: string, password: string, matricNo: string, fullName : string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email, matricNo, fullName });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }
  

  
}



