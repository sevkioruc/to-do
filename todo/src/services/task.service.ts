import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {
    }

    addTask(content: string) {
        return this.http.post<{message: string, content: string}>('http://localhost:3000/api/create', {content});
    }

    getTask() {
        return this.http.get<{tasks: string[]}>('http://localhost:3000/api/get');
    }

    deleteTask(taskId: string) {
        return this.http.delete('http://localhost:3000/api/delete/' + taskId);
    }
}
