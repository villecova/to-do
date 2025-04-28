import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { LoadingController } from '@ionic/angular'
import { ExerciseListComponent } from '../../shared/components/exercise-list/exercise-list.component'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    ExerciseListComponent,
  ],
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
