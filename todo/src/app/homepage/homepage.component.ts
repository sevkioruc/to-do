import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  updatedTask: string;
  tasks: Task[] = [];

  private task: string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTask();
  }

  saveTask() {
    this.taskService.addTask(this.task).subscribe((result) => {
      this.tasks.push(result.task);
      this.task = '';
    }, (err) => console.log(err));
  }

  getAllTask() {
    this.taskService.getTasks().subscribe((result) => {
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
    });
  }

  hasTask() {
    return this.tasks.length > 0;
  }

}
