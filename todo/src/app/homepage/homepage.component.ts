import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  hasTask: number;
  task: string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  saveTask() {
    this.taskService.addTask(this.task).subscribe((result) => {
      console.log(result);
    },
    (err) => {
      console.log(err);
    });
  }

}
