import { Component, OnInit } from '@angular/core';
import { ClassListInterface, ClassInfoService } from './../services/class-info.service';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.page.html',
  styleUrls: ['./list-class.page.scss'],
})
export class ListClassPage implements OnInit {
  classes: ClassListInterface[];
  
  constructor(private classInfoService: ClassInfoService) { }

  ngOnInit() {
    this.classInfoService.getDetails().subscribe(res => {
      this.classes = res;
    });
  }

  remove(item) {
    this.classInfoService.removeDetail(item.id);
  }

}


