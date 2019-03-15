import { LoadingController } from '@ionic/angular';
import { ClassListInterface,ClassInfoService } from './../services/class-info.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.page.html',
  styleUrls: ['./class-detail.page.scss'],
})
export class ClassDetailPage implements OnInit {
  classDetail: ClassListInterface = {
    id: "",
    students: [],
    date: 0
  };

  classId = null;

  constructor(private classService:ClassInfoService, private route:ActivatedRoute, private loadingController:LoadingController) { }

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
    this.classService.getDetail(this.classId).subscribe(res => {
      loading.dismiss();
      this.classDetail = res;
      console.log(res);
    });
  }

}
