import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

interface Profile{
  id?: string;
  name: any;
  matricNo: number;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})


export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  private classCollection: AngularFirestoreCollection<any>;
  private userID: string = "default";
  private classList: Observable<Profile[]>;


  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    db: AngularFirestore
  ) {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      matricNo:[
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ],
      fullName: [
        '',
        Validators.compose([]),
      ]
    });

    firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log(user.uid);
            this.userID = user.uid;
            this.classCollection = db.collection<any>('users');
            this.classList = this.classCollection.valueChanges();    
          } else {
            console.log("failed to get user");
            // No user is signed in.
          }
        });
    
      

  }
  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const matricNo : string = signupForm.value.matricNo;
      const fullName : string = signupForm.value.fullName;  
      this.authService.signupUser(email, password, matricNo, fullName).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('login');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  ngOnInit() {}

}
