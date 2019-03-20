import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ClassListInterface, ClassInfoService } from './../services/class-info.service';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.page.html',
  styleUrls: ['./list-class.page.scss'],
})
export class ListClassPage implements OnInit {
  classes: ClassListInterface[];
  
  constructor(private classInfoService: ClassInfoService, private loadingController:LoadingController) { }

  ngOnInit() {
    this.loadClassInfo();
    // this.classInfoService.getDetails().subscribe(res => {
    //   this.classes = res;
    // });
  }

  async loadClassInfo() {
    const loading = await this.loadingController.create({
      message: 'Loading class info..'
    });
    await loading.present();
    this.classInfoService.getDetails().subscribe(res => {
      loading.dismiss();
      this.classes = res;
    });
  }


  remove(item) {
    this.classInfoService.removeDetail(item.id);
  }

}


