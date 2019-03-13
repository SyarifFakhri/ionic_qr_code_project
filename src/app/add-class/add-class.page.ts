import { ClassListInterface, ClassInfoService } from './../services/class-info.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
 

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})

export class AddClassPage implements OnInit {

  classInfo: ClassListInterface = { 
    classCode: 'test class code',
    className: 'test class name',
    createdBy: 'john doe'
  };
 
  classId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private classService: ClassInfoService, private loadingController: LoadingController) { }
 
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
 
    this.classService.getTodo(this.classId).subscribe(res => {
      loading.dismiss();
      this.classInfo = res;
    });
  }
 
  async saveClassInfo() {
 
    const loading = await this.loadingController.create({
      message: 'Saving class info..'
    });
    await loading.present();
 
    if (this.classId) {
      this.classService.updateTodo(this.classInfo, this.classId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('list-class');
      });

    } else {
      this.classService.addTodo(this.classInfo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('list-class');
      });
    }
  }

}
