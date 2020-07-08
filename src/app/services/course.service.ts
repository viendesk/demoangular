import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from './../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  public API: string = 'https://5f03fe9b4c6a2b0016490670.mockapi.io/courses'
  //public API: string = 'http://localhost:3000/courses';

  constructor(public http: HttpClient) { }

  getAllCourses() : Observable<Course[]>{
    //console.log(this.http.get(this.API));
    
    return this.http.get<Course[]>(this.API);
  }

  addCourse(course: Course) : Observable<Course> {
    return this.http.post<Course>(this.API, course );
  }

  deleteCourse(id: number) : Observable<{}>{
    const url = `${this.API}/${id}`; // DELETE courses/2
    return this.http.delete(url);
  }

  updateCourse( course: Course): Observable<Course>{
    const url = `${this.API}/${course.id}`; 
    return this.http.put<Course>(url, course);
  }

  getAcourse(id: number){
    const url = `${this.API}/${id}`;
    return this.http.get(url);
  }
}
