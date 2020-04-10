import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly baseURI = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {
    }

    addTask(content: string) {
        return this.http.post<{task: Task}>(`${this.baseURI}/create`, {content});
    }

    getTasks() {
        return this.http.get<{tasks: Task[]}>(`${this.baseURI}/get`);
    }

    deleteTask(taskId: string) {
        return this.http.delete<{message: string}>(`${this.baseURI}/delete/` + taskId);
    }

    updateTask(taskId: string, content: string) {
        return this.http.put<{message: string, task: Task}>(`${this.baseURI}/update/` + taskId, {content});
    }

}
