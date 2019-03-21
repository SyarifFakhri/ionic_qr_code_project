import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ClassListInterface, ClassInfoService } from './../services/class-info.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.page.html',
  styleUrls: ['./list-class.page.scss'],
})
export class ListClassPage implements OnInit {
  classes: ClassListInterface[];
  classCollection: AngularFirestoreCollection<any>;
  private userID: string = "lecturer1";
  private classList: Observable<ClassListInterface[]>;

  constructor(private classInfoService: ClassInfoService, 
              private loadingController:LoadingController,
              private db: AngularFirestore) { 
                this.classCollection = db.collection<any>('users');
                this.classList = this.classCollection.doc(this.userID).collection<ClassListInterface>("class").valueChanges();
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
  
  remove(item) {
    this.classInfoService.removeDetail(item.id);
  }

}


