import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonBackButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
} from '@ionic/angular/standalone'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { LoadingController } from '@ionic/angular'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonButtons,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  ],
})
export class ResetPasswordPage implements OnInit {
  formForgoPassword: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formForgoPassword = new FormGroup({
      email: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.email],
      }),
    })
  }

  goBack() {
    this.router.navigate(['/login'])
  }
  async onResetPassword() {
    const loading = await this.loadingController.create({
      message: 'Sending email...',
      spinner: 'bubbles',
      duration: 2000,
    })
    await loading.present()

    const { email } = this.formForgoPassword.value

    if (this.formForgoPassword.valid) {
      this.authService
        .resetPassword(email)
        .then(() => {
          loading.dismiss()
          this.router.navigate(['/login'])
        })
        .catch((error) => {
          loading.dismiss()
          console.error('Error sending email:', error)
        })
    }
  }
}
