import { AuthService } from '../services/auth/auth.service'

import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { map, take } from 'rxjs/operators'
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.userIsAuthenticated.pipe(
    take(1),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login'])
        return false
      }
      return true
    })
  )
}
