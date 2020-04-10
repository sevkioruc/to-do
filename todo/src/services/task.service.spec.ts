import { TaskService } from './task.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from 'src/models/task.model';

describe('TaskService', () => {
    const baseURI = 'http://localhost:3000/api';

    const dummyTasks: Task[] = [
        {content: 'Jasmine', _id: '1'},
        {content: 'Karma', _id: '2'}
    ];

    const dummyUpdatedTask = {
        message: 'Task updated successfully',
        task: {
            _id: '1',
            content: 'Angular'
        }
    };

    const dummyAddedTask = {
        _id: '1',
        content: 'New task'
    };

    const dummyDeletedTask =  {
        message: 'Task deleted'
    };

    let taskService: TaskService;
    let httpTestingController: HttpTestingController;

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

    it('should retrieve all tasks', () => {
        taskService.getTasks().subscribe((tasks: any) => {
            expect(tasks).toBeTruthy('No tasks returned');

            expect(tasks.length).toBe(2, 'incorrect number of tasks');

            const selectedTask = tasks.find(task => task._id === '2');

            expect(selectedTask.content).toBe('Karma');
        });

        const req = httpTestingController.expectOne(`${baseURI}/get`);

        expect(req.request.method).toBe('GET');

        req.flush(dummyTasks);
    });

    it('should update the task content', () => {
        const changes = {
            taskId: '1',
            content: 'Angular'
        };

        taskService.updateTask(changes.taskId, changes.content).subscribe((task) => {
            expect(task.task.content).toBe('Angular');
            expect(task.message).toBe('Task updated successfully');
        });

        const req = httpTestingController.expectOne(`${baseURI}/update/1`);

        expect(req.request.method).toBe('PUT');
        expect(req.request.body.content).toBe('Angular');

        req.flush(dummyUpdatedTask);
    });

    it('should delete the task', () => {
        taskService.deleteTask('1').subscribe(result => {
            expect(result.message).toBe('Task deleted');
        });

        const req = httpTestingController.expectOne(`${baseURI}/delete/1`);
        expect(req.request.method).toBe('DELETE');

        req.flush(dummyDeletedTask);
    });

    it('should save the task', () => {
        taskService.addTask('Test data').subscribe(result => {
            expect(result.task.content).toBe('New task');
        });

        const req = httpTestingController.expectOne(`${baseURI}/create`);
        expect(req.request.method).toBe('POST');

        req.flush(dummyAddedTask);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
