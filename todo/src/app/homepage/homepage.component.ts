import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  task: string;
  updatedTask: string;
  updatedTaskId: string;
  tasks: any[] = [];

  isClick = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTask();
  }

  saveTask() {
    this.taskService.addTask(this.task).subscribe((result) => {
      this.tasks.push(result);
      this.task = '';
    }, (err) => console.log(err));
  }

  getAllTask() {
    this.taskService.getTask().subscribe((result) => {
      this.tasks = result.tasks;
    });
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      const index = this.tasks.findIndex((task) => task._id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    });
  }

  updateTask(taskId: string, content: string) {
    this.taskService.updateTask(taskId, content).subscribe(() => {
      const index = this.tasks.findIndex((task) => task._id === taskId);
      if (index !== -1) {
        this.tasks[index].content = content;
      }
    }, (err) => console.log(err));  }

  hasTask() {
    return this.tasks.length > 0;
  }

}
