import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ClassListInterface, ClassInfoService } from './../services/class-info.service';
import { Observable } from 'rxjs';  
import * as firebase from 'firebase';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.page.html',
  styleUrls: ['./list-class.page.scss'],
})
export class ListClassPage implements OnInit {
  classes: ClassListInterface[];
  classCollection: AngularFirestoreCollection<any>;
  private userID: string = "default";
  private classList: Observable<ClassListInterface[]>;

  //if the database is called from the service, instead of initialized
  //within the constructor, on the second load of the database it will become 
  //stuck. Suspect that it is an issue with the db not initializing properly
  constructor(private classInfoService: ClassInfoService, 
              private loadingController:LoadingController,
              private db: AngularFirestore) {
                
                firebase.auth().onAuthStateChanged(user => {
                  if (user) {
                    console.log(user.uid);
                    this.userID = user.uid;
                    this.classCollection = db.collection<any>('users');
                    this.classList = this.classCollection.doc(this.userID).collection<ClassListInterface>("class").valueChanges();
                  } else {
                    console.log("failed to get user");
                    // No user is signed in.
                  }
                });
              }

  ngOnInit() {
    this.loadClassInfo();
  }

  async loadClassInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();
    this.classList.subscribe(res => {
      loading.dismiss();
      this.classes = res;
    });
  }
  
  async remove(item) {
    // this.classInfoService.removeDetail(item.id);
    const loading = await this.loadingController.create({
      message: 'deleting class...'
    });
    await loading.present();
    this.classInfoService.removeDetail(item.id).then(res => {
      loading.dismiss();
    });
  }

}


