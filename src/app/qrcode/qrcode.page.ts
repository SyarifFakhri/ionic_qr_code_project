import { studentInterface, AddStudentService } from './../services/add-student.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})

export class QrcodePage implements OnInit {

  studentInfo:studentInterface = {
    studentId: "1513993",
    lecturerId: "lecturer1",
    classId: "mathematics"
  }
  constructor(private nav: NavController, private loadingController: LoadingController, private studentService: AddStudentService) { }

  ngOnInit() {
  }

  async addStudent() {
    const loading = await this.loadingController.create({
      message: 'adding student..'
    });
    await loading.present();

    this.studentService.addStudent(this.studentInfo).then(() => {
      loading.dismiss();
      this.nav.navigateBack('dashboard');
    });
    
  }

}


