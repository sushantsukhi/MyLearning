import {AuthorService} from './author.service';
import {Component} from '@angular/core';
import {CourseService} from './course.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
          <h1> Angular 2 App </h1>
          <h4> {{title1}} </h4>
          <ul>
            <li *ngFor="let course of courses">
              {{course}}
            </li>
          </ul>
          <h4> {{title2}} </h4>
          <ul>
            <li *ngFor="let author of authors">
              {{author}}
            </li>
          </ul>
          `,
  providers: [CourseService, AuthorService]
})

export class AppComponent {
  title1 = 'Courses: ';
  title2 = 'Authors: ';
  courses;
  authors;
  constructor(courseService: CourseService, authorService: AuthorService) {
    this.courses = courseService.getCourses();
    this.authors = authorService.getAuthors();
  }

}
