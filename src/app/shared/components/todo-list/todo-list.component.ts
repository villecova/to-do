import { Component, inject, OnInit, ViewChild } from '@angular/core'
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
  IonChip,
  IonIcon,
  IonButton,
  IonListHeader,
  IonModal,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
} from '@ionic/angular/standalone'
import { NgFor } from '@angular/common'
import { DatePipe } from '@angular/common'
import { Exercise } from 'src/app/core/models/exercise.model'
import { addIcons } from 'ionicons'
import { closeCircleOutline } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components'
import { TodoCreateComponent } from '../todo-create/todo-create.component'
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  imports: [
    IonButtons,
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
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    TodoCreateComponent,
  ],
})
export class TodoListComponent implements OnInit {
  private exerciseService = inject(ExerciseService)

  @ViewChild(IonModal) modal!: IonModal
  @ViewChild(TodoCreateComponent) todoCreateComponent!: TodoCreateComponent

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  name!: string
  exercisesList: Exercise[] = []

  // private exerciseService = inject(ExerciseService)

  constructor() {
    addIcons({ closeCircleOutline })
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.exercisesList = exercises
    })
  }

  ngOnInit() {}

  addNewExercise() {
    //open a modal to add a new exercise
  }

  completedToogle(exercise: Exercise) {
    exercise.completed = !exercise.completed
    console.log('exercise.completed:::', exercise.completed)
    //save the item in the database
    this.exerciseService
      .updateExercise(exercise.id, exercise)
      .then(() => {
        console.log('Exercise updated successfully')
      })
      .catch((error) => {
        console.log('Error updating exercise:::', error)
      })
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
    this.exerciseService.deleteExercise(exercise.id).then(() => {
      console.log('Exercise deleted successfully')
    })
  }

  get pendingExercises() {
    return this.exercisesList.filter((e) => !e.completed)
  }

  get completedExercises() {
    return this.exercisesList.filter((e) => e.completed)
  }

  cancel() {
    this.modal.dismiss(null, 'cancel')
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm')
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`
    }

    this.todoCreateComponent.resetForm()
  }

  handleSave(exercise: Exercise) {
    const newExercise: Exercise = {
      ...exercise,
      completed: false, // <-- todos los nuevos ejercicios empiezan no completados
    }

    this.exercisesList.push(newExercise)
    this.closeModal()
    console.log('this.exercisesList:::', this.exercisesList)
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel')
  }
}
