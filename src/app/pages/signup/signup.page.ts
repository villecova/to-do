import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { eye, eyeOff } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  LoadingController,
  IonGrid,
  IonRow,
  IonCol,
  IonInputPasswordToggle,
  IonNote,
} from '@ionic/angular/standalone'
import { AuthService } from 'src/app/core/services/auth/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonInputPasswordToggle,
    IonNote,
  ],
})
export class SignupPage implements OnInit {
  formRegister: FormGroup = new FormGroup({})
  showPassword = false
  showConfirmationPassword = false

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {
    addIcons({ eye, eyeOff })
  }

  ngOnInit() {
    this.initForm()
  }

  async signup() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000,
    })
    await loading.present()

    const { email, password } = this.formRegister.value

    if (this.formRegister.valid) {
      const user = await this.authService
        .signup(email, password)
        .catch((error) => {
          console.error('Error registering user:', error)
          loading.dismiss()
        })
      if (user) {
        loading.dismiss()
        console.log('User registered successfully')
        this.router.navigate(['/welcome'])
      } else {
        console.log('Error registering user')
      }
    }
  }

  initForm() {
    this.formRegister = new FormGroup(
      {
        name: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(3)],
        }),
        email: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: this.passwordMatchValidator }
    )
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value

    if (password !== confirmPassword) {
      return { passwordMismatch: true }
    }
    return null
  }

  getErrorMessage(controlName: string): string {
    const control = this.formRegister.get(controlName)

    if (control?.hasError('required')) {
      return 'This field is required'
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Please enter a valid email address'
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`
    }
    if (
      this.formRegister.hasError('passwordMismatch') &&
      (controlName === 'password' || controlName === 'confirmPassword')
    ) {
      return 'Passwords do not match'
    }

    return ''
  }

  onRegister() {
    console.log('Form submitted:', this.formRegister.value)
    if (this.formRegister.valid) {
      console.log('Form is valid')
      // Perform register action
    } else {
      console.log('Form is invalid')
    }
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }
}
