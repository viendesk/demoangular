import { Component, OnInit , OnDestroy} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CourseService} from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  public subs : Subscription;
  public courses : Course[] = [];
  constructor(public courseService: CourseService) { }

  ngOnInit(): void {
    //console.log(this.courseService.getAllCourses());

    this.subs =  this.courseService.getAllCourses().subscribe((data: Course[])  =>{
      this.courses = data;
    });
     
  }

  ngOnDestroy() {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }

  onDeleteCourse(id: number){
    this.courseService.deleteCourse(id).subscribe();
    this.updateDataAfterDelete(id);

  }

  updateDataAfterDelete(id: number){
    for (let i = 0; i < this.courses.length; i++) {
      if(this.courses[i].id === id){
        this.courses.splice(i,1);
        break;
      } 
    }
  }

}
