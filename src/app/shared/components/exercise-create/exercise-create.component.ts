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
} from '@ionic/angular/standalone'
import { ExerciseService } from 'src/app/core/services/exercise/exercise.service'

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
  @Input() isEditing: any | null = null // Recibe el objeto a editar o null para crear uno nuevo
  exerciseForm!: FormGroup

  private exerciseService = inject(ExerciseService)

  @Output() save = new EventEmitter<any>()

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
      reps: new FormControl('', [Validators.required]),
      sets: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      completed: new FormControl(false),
    })
  }

  onSubmit() {
    if (this.exerciseForm.invalid) {
      return
    }

    if (this.isEditing) {
      // Lógica para editar
      this.exerciseService
        .updateExercise(this.isEditing.id, this.exerciseForm.value)
        .then(() => {
          console.log('Exercise updated successfully')
        })
    } else {
      //post the todo to the database
      this.exerciseService.addExercise(this.exerciseForm.value).then(() => {
        console.log('Exercise added successfully')
      })
    }
    this.save.emit(this.exerciseForm.value)
    this.resetForm()
  }

  resetForm() {
    this.exerciseForm.reset()
    this.isEditing = null
  }

  populateForm(todo: any) {
    this.exerciseForm.patchValue(todo) // Llena el formulario con los valores del objeto a editar
  }
}
