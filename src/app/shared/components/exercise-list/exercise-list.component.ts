import { Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core'
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
  ToastController,
} from '@ionic/angular/standalone'
import { NgFor } from '@angular/common'
import { DatePipe } from '@angular/common'
import { Exercise } from 'src/app/core/models/exercise.model'
import { addIcons } from 'ionicons'
import { closeCircleOutline } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components'
import { ExerciseCreateComponent } from '../exercise-create/exercise-create.component'
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
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
    ExerciseCreateComponent,
  ],
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  private exerciseService = inject(ExerciseService)
  private authService = inject(AuthService)
  private toastController = inject(ToastController)
  private exerciseSubscription?: Subscription

  @ViewChild(IonModal) modal!: IonModal
  @ViewChild(ExerciseCreateComponent)
  exerciseCreateComponent!: ExerciseCreateComponent

  exercisesList: Exercise[] = []

  constructor() {
    addIcons({ closeCircleOutline })
  }

  ngOnInit() {
    this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Cancelar la suscripción anterior si existe
        if (this.exerciseSubscription) {
          this.exerciseSubscription.unsubscribe()
        }

        // Crear nueva suscripción
        this.exerciseSubscription = this.exerciseService
          .getExercises()
          .subscribe((exercises) => {
            this.exercisesList = exercises
          })
      } else {
        this.exercisesList = []
      }
    })
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }

  completedToogle(exercise: Exercise) {
    exercise.completed = !exercise.completed
    this.exerciseService
      .updateExercise(exercise.id, exercise)
      .then(() => {
        console.log('Exercise updated successfully')
      })
      .catch((error) => {
        console.log('Error updating exercise:::', error)
      })
  }

  async deleteExercise(exercise: Exercise) {
    try {
      await this.exerciseService.deleteExercise(exercise.id)
      const toast = await this.toastController.create({
        message: 'Ejercicio eliminado correctamente',
        duration: 2000,
        position: 'bottom',
      })
      await toast.present()
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al eliminar el ejercicio',
        duration: 2000,
        position: 'bottom',
      })
      await toast.present()
    }
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

  onWillDismiss() {
    this.exerciseCreateComponent.resetForm()
  }

  handleSave(exercise: Exercise) {
    this.closeModal()
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel')
  }
}
