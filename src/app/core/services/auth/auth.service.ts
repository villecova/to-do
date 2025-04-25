import { inject, Injectable } from '@angular/core'
import { Auth, sendPasswordResetEmail, signOut } from '@angular/fire/auth'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Observable, shareReplay } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth)

  constructor() {}

  get userIsAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(!!user)
      })
      return { unsubscribe }
    }).pipe(
      shareReplay(1) // cachea el último valor
    )
  }

  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.auth, email)
  }

  async signOut() {
    return await signOut(this.auth)
  }

  async getCurrentUser() {
    return this.auth.currentUser // o await currentUser(this.auth); para obtener una promesa
  }

  //   async isLoggedIn() {
  //     const user = await this.auth.currentUser
  //     return user !== null
  //   }

  //   async getUserId() {
  //     const user = await this.auth.currentUser
  //     return user ? user.uid : null
  //   }
}
