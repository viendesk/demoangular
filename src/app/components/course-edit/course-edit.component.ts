import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute , Params} from '@angular/router'

import { Course } from './../../models/course.model';
import { CourseService} from './../../services/course.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  public editCourse: Course;
  public subsParams : Subscription;
  public subs : Subscription;
  
  constructor(
    public courseService: CourseService,
    public routerService : Router,
    public activatedRouteService : ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.editCourse = new Course;
    this.loadData();
  }

  loadData(){
    this.subsParams = this.activatedRouteService.params.subscribe((data:Params) => {
      let id = data['id'];
      
      this.subs = this.courseService.getAcourse(id).subscribe( (course: Course) => {
        console.log(course);
        this.editCourse = course;
        
      });
    })
  }

  onEditCourse(){
    this.subs = this.courseService.updateCourse(this.editCourse).subscribe((data: Course) =>{
      console.log(data);
      if( data.id){
        this.routerService.navigate(['courses'])
      }
    });
  }


  goBack(): void {
    this.location.back();
  }

}
