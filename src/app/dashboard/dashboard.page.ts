import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  userID:any;

  constructor(private db: AngularFirestore) {
      
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          // console.log(user)
          // this.userID = user.name;
          let classCollection = db.collection<any>('userProfile');
          let classList = classCollection.doc<any>(user.uid).valueChanges().subscribe(data => {
            console.log(data);
            this.userID = data.fullName;
          },
          data => {
            console.log("failed to get user");
          });

          

        } else {
          console.log("failed to get user");
          // No user is signed in.
        }
      });
    }


  ngOnInit() {
  }

}
