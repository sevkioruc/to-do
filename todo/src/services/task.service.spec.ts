import { TaskService } from './task.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TaskService', () => {
    let taskService: TaskService;
    let httpTestingController: HttpTestingController;

    const dummyTasks: string[] = ['Mission 1', 'Mission 2'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TaskService,
            ]
        });

        taskService = TestBed.get(TaskService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

});
