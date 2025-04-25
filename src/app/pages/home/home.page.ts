import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  async logOut() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'bubbles',
      duration: 2000,
    })
    await loading.present()
    this.authService
      .signOut()
      .then(() => {
        console.log('User logged out')
        this.router.navigate(['/login'])
        loading.dismiss()
      })
      .catch((error) => {
        console.error('Error logging out:', error)
      })
    // Implement your logout logic here
  }
}
