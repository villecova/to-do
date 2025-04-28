import { Component, OnInit } from '@angular/core'
import { Todo } from 'src/app/core/models/todo.model'
import {
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCheckbox,
  IonNote,
  IonText,
  IonCardSubtitle,
  IonThumbnail,
  IonImg,
  IonInput,
  IonChip,
  IonIcon,
} from '@ionic/angular/standalone'
import { NgFor } from '@angular/common'
import { DatePipe } from '@angular/common'
import { Exercise } from 'src/app/core/models/exercise.model'
import { addIcons } from 'ionicons'
import { closeCircleOutline } from 'ionicons/icons'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [
    IonCardSubtitle,
    IonText,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    NgFor,
    IonCheckbox,
    IonNote,
    DatePipe,
    IonThumbnail,
    IonImg,
    IonInput,
    IonChip,
    IonIcon,
  ],
})
export class TodoListComponent implements OnInit {
  toDoList: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      dueDate: new Date('2025-01-01'),
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      dueDate: new Date('2025-01-02'),
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      description: 'Description 3',
      dueDate: new Date('2025-01-03'),
      priority: 'low',
      completed: false,
    },
  ]

  exercisesList: Exercise[] = [
    {
      id: '1',
      name: 'Exercise 1',
      reps: 10,
      sets: 3,
      weight: 100,
    },
    {
      id: '2',
      name: 'Exercise 2',
      reps: 10,
      sets: 3,
      weight: 100,
    },
    {
      id: '3',
      name: 'Exercise 3',
      reps: 10,
      sets: 3,
      weight: 100,
    },
  ]

  constructor() {
    addIcons({ closeCircleOutline })
  }

  ngOnInit() {}
}
