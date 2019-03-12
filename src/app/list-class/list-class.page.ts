import { ClassListInterface, ClassInfoService } from './../services/class-info.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.page.html',
  styleUrls: ['./list-class.page.scss'],
})
export class ListClassPage implements OnInit {
  classes: ClassListInterface[];
  constructor(private classInfoService: ClassInfoService) { }

  ngOnInit() {
    this.classInfoService.getTodos().subscribe(res => {
      this.classes = res;
    });
  }

  remove(item) {
    this.classInfoService.removeTodo(item.id);
  }

}


