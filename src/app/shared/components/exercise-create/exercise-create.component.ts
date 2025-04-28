import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms'
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone'
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service'
import { Exercise } from 'src/app/core/models/exercise.model'

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss'],
  imports: [
    IonInput,
    IonItem,
    IonLabel,
    ReactiveFormsModule,
    FormsModule,
    IonButton,
  ],
})
export class ExerciseCreateComponent implements OnInit {
  @Input() isEditing: Exercise | null = null
  exerciseForm!: FormGroup

  private exerciseService = inject(ExerciseService)
  private toastController = inject(ToastController)

  @Output() save = new EventEmitter<Exercise>()
  @Output() cancel = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {
    this.initForm()
    if (this.isEditing) {
      this.populateForm(this.isEditing)
    }
  }

  initForm() {
    this.exerciseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      reps: new FormControl('', [Validators.required, Validators.min(1)]),
      sets: new FormControl('', [Validators.required, Validators.min(1)]),
      weight: new FormControl('', [Validators.required, Validators.min(0)]),
      completed: new FormControl(false),
    })
  }

  async onSubmit() {
    if (this.exerciseForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Por favor completa todos los campos correctamente',
        duration: 2000,
        position: 'bottom',
      })
      await toast.present()
      return
    }

    try {
      const exerciseData = this.exerciseForm.value
      if (this.isEditing) {
        await this.exerciseService.updateExercise(
          this.isEditing.id,
          exerciseData
        )
        const toast = await this.toastController.create({
          message: 'Ejercicio actualizado correctamente',
          duration: 2000,
          position: 'bottom',
        })
        await toast.present()
        this.save.emit({ ...exerciseData, id: this.isEditing.id })
      } else {
        await this.exerciseService.addExercise(exerciseData)
        const toast = await this.toastController.create({
          message: 'Ejercicio agregado correctamente',
          duration: 2000,
          position: 'bottom',
        })
        await toast.present()
        this.save.emit(exerciseData)
      }
      this.resetForm()
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al guardar el ejercicio',
        duration: 2000,
        position: 'bottom',
      })
      await toast.present()
    }
  }

  resetForm() {
    this.exerciseForm.reset()
    this.isEditing = null
  }

  populateForm(exercise: Exercise) {
    this.exerciseForm.patchValue(exercise)
  }

  onCancel() {
    this.cancel.emit()
  }
}
