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
  IonButton,
  IonListHeader,
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
    IonButton,
    IonListHeader,
    NgFor,
  ],
})
export class TodoListComponent implements OnInit {
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

  addNewExercise() {
    //open a modal to add a new exercise
  }

  completedToogle(exercise: Exercise) {
    exercise.completed = !exercise.completed
    console.log('exercise.completed:::', exercise.completed)
    //save the item in the database
  }

  markAsCompleted(exercise: Exercise) {
    exercise.completed = true
    console.log('exercise.completed:::', exercise.completed)
    //save the item in the database
  }

  markAsUncompleted(exercise: Exercise) {
    exercise.completed = false
    console.log('exercise.completed:::', exercise.completed)
    //save the item in the database
  }

  deleteExercise(exercise: Exercise) {
    //delete the item in the database
  }

  get pendingExercises() {
    return this.exercisesList.filter((e) => !e.completed)
  }

  get completedExercises() {
    return this.exercisesList.filter((e) => e.completed)
  }
}
