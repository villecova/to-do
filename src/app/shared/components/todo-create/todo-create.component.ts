import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
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
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  imports: [
    IonInput,
    IonItem,
    IonLabel,
    ReactiveFormsModule,
    FormsModule,
    IonButton,
  ],
})
export class TodoCreateComponent implements OnInit {
  todoForm!: FormGroup

  private exerciseService = inject(ExerciseService)

  @Output() save = new EventEmitter<any>()

  constructor() {}

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.todoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      reps: new FormControl('', [Validators.required]),
      sets: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      completed: new FormControl(false),
    })
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      return
    }

    //post the todo to the database
    this.exerciseService.addExercise(this.todoForm.value).then(() => {
      console.log('Exercise added successfully')
    })
    this.save.emit(this.todoForm.value)
    this.resetForm()
  }

  resetForm() {
    this.todoForm.reset()
  }
}
