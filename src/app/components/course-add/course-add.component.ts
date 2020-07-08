import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

import { Course } from './../../models/course.model';
import { CourseService} from './../../services/course.service';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  public newCourse: Course;
  public subs : Subscription;

  constructor(
    public courseService: CourseService,
    public routerService : Router
    ) { }

  ngOnInit(): void {
    this.newCourse = new Course;
  }
  onAddCourse(){
    this.subs = this.courseService.addCourse(this.newCourse).subscribe(data => {
      console.log(data);
      if( data.id){
        this.routerService.navigate(['courses'])
      }
      
    });
    
  }


  ngOnDestroy() {
    if(this.subs){
      this.subs.unsubscribe();
    }
  }
}
