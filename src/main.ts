import { bootstrapApplication } from '@angular/platform-browser'
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router'
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { environment } from './environments/environment'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { routes } from './app/app.routes'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
})
