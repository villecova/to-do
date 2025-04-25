import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {
  formLogin: FormGroup = new FormGroup({})
  showPassword = false

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

  async login() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000,
    })
    await loading.present()

    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value
      try {
        await this.authService.login(email, password)
        console.log('User registered successfully')
        this.router.navigate(['/home'])
      } catch (error) {
        console.error('Error registering user:', error)
      } finally {
        loading.dismiss()
      }
    } else {
      console.log('Form is invalid')
      loading.dismiss()
    }
  }

  initForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.formLogin.get(controlName)

    if (control?.hasError('required')) {
      return 'This field is required'
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Please enter a valid email address'
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`
    }

    return ''
  }

  onLogin() {
    console.log('Form submitted:', this.formLogin.value)
    if (this.formLogin.valid) {
      console.log('Form is valid')
      // Perform login action
    } else {
      console.log('Form is invalid')
    }
  }

  goToRegister() {
    this.router.navigate(['/signup'])
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password'])
  }
}
