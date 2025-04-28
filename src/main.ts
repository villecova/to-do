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
import {
  provideFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from '@angular/fire/firestore'
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
    provideFirestore(() => {
      const firestore = initializeFirestore(
        initializeApp(environment.firebaseConfig),
        {
          cacheSizeBytes: CACHE_SIZE_UNLIMITED,
          experimentalForceLongPolling: true,
        }
      )
      return firestore
    }),
    provideAuth(() => getAuth()),
  ],
})
