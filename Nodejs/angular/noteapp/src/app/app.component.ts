import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownModule, MarkdownService, provideMarkdown } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';

interface Task {
  id: string;
  task: string;
  date: Date;
  isEdit: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MarkdownModule],
  providers: [MarkdownService, provideMarkdown()],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'noteapp';
  localtask = localStorage.getItem('tasks');
  tasks = this.localtask ? JSON.parse(this.localtask) : [];

  onNewTask(): void {
    const newTask = {
      date: Date.now(),
      task: 'New Task',
      id: guidGenerator(),
      isEdit: false,
    };
    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(id: string): void {
    this.tasks = this.tasks.map((task: Task) => {
      if (task.id === id) return { ...task, isEdit: true };
      return task;
    });
  }

  changeTask(e: Event, id: string): void {
    if (!e.target) throw 'Something went wrong';
    (e.target as HTMLElement).addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const newTaskName = (e.target as HTMLElement).innerText;
          this.tasks = this.tasks.map((task: Task) => {
            if (task.id === id)
              return { ...task, task: newTaskName, isEdit: false };
            return task;
          });
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      }
    );
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0]; // Get the time part
    return `${day}.${month}.${year}-${time}`;
  }
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}
