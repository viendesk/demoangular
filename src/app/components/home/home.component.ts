import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from './../../models/course.model';
import { CourseService} from './../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: Course[] = [];
  top3courses : Course[] = [];

  constructor(
    public courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getTopCourses();
  }

  getTop3(): void{
    this.top3courses = this.courses.sort((n1,n2) => {
      if (n1.fee > n2.fee) {
          return 1;
      }
  
      if (n1.fee < n2.fee) {
          return -1;
      }
      return 0;
    });

    this.top3courses = this.top3courses.slice(0,3);
  }

  getTopCourses() : void{
    this.courseService.getAllCourses()
      .subscribe(courses => {
        this.courses = courses;
        this.getTop3();
      }
      );
  }

  

}
