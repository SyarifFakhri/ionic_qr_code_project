import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ClassListInterface,ClassInfoService } from './../services/class-info.service';
import { CodeInterface,CodeService } from './../services/code.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __generator } from 'tslib';
import * as firebase from 'firebase';
import { first } from 'rxjs/operators';
import { async } from 'q';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  subjects:ClassListInterface[];
  classDetail: ClassListInterface = {
    id: "",
    students: [],
    date: Date(),
  };

  codeDetail: CodeInterface = {
      lecturer:"",
      id:"", //refers to code generated
      subject:"",
      date: Date()
  };
  
  classId = null;
  classCollection: AngularFirestoreCollection<any>;
  

  private userID: string = "default";

  constructor(private classService:ClassInfoService, 
    private route:ActivatedRoute, 
    private loadingController:LoadingController,
    private db: AngularFirestore,
    private codeserv: CodeService,
    public alertController: AlertController,
    public router: NavController) { 
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          this.userID = user.uid;  
          this.classCollection=db.collection<any>('users');
        } else {
          console.log("failed to get user");
          // No user is signed in.
        }
      });
  
    }
    
  ngOnInit() {
    this.classId = this.route.snapshot.params['id'];

    if (this.classId)  {
      this.loadClassInfo();
    }
  }

  async loadClassInfo() {

    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();

    this.classCollection.doc(this.userID)
    .collection<ClassListInterface>("class")
    .doc<any>(this.classId)
    .collection<ClassListInterface>("classCodeDates")
    .valueChanges().subscribe( res => {

      this.subjects = res;
      loading.dismiss();
      console.log(this.subjects);
    });
    
  }

  gotoStudentDetail(classDet:ClassListInterface) {
    // console.log(classDet)


    this.router.navigateForward(['/display-student', { subject: classDet.id, date:classDet.date }]);
  }
  
  async codeGenerator() {
    const loading = await this.loadingController.create({
      message: 'Generating code..'
    });

    await loading.present();
    this.codeDetail.lecturer=this.userID;
    this.codeDetail.subject=this.classId;
    //this.codeDetail.date
    this.codeDetail.id = this.codeserv.generatorCode();


    this.codeserv.getCode(this.codeDetail).pipe(first()).subscribe(data => {
          if (data.length > 0) {
            console.log(data);
            console.log("Data already exists, so not created, recalling function again");
            loading.dismiss();
            this.codeGenerator();
          }
          else if (data.length == 0) {
            console.log(data);
            console.log("created");
            this.codeserv.addCode(this.codeDetail).then(() => {
              this.classDetail.id = this.codeDetail.subject;
              this.classDetail.date = this.codeDetail.date;

              this.codeserv.createClassCodeDates(this.classDetail).then(async data => {
                loading.dismiss();
                const alert = await this.alertController.create({
                header: 'Class code',
                subHeader: 'Give this to your students',
                message: this.codeDetail.id,
                buttons: ['OK']
              });
              await alert.present();
            }); 
          });

         


        }
    
    // this.codeserv.addCode(this.codeDetail)
    });
  }
}


