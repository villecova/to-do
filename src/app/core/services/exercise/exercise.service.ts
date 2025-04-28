import { Injectable } from '@angular/core'
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Exercise } from '../../models/exercise.model'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private collectionName = 'users'

  constructor(private fireStore: Firestore, private authService: AuthService) {}

  private getExercisesCollection() {
    const user = this.authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')
    return collection(
      this.fireStore,
      `${this.collectionName}/${user.uid}/exercises`
    )
  }

  async addExercise(exercise: Exercise): Promise<void> {
    const exercisesCollection = this.getExercisesCollection()
    await addDoc(exercisesCollection, exercise)
  }

  getExercises(): Observable<Exercise[]> {
    const exercisesCollection = this.getExercisesCollection()
    return collectionData(exercisesCollection, { idField: 'id' }) as Observable<
      Exercise[]
    >
  }

  async updateExercise(id: string, exercise: Partial<Exercise>): Promise<void> {
    const user = this.authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const exerciseDoc = doc(
      this.fireStore,
      `${this.collectionName}/${user.uid}/exercises/${id}`
    )
    await updateDoc(exerciseDoc, exercise)
  }

  async deleteExercise(id: string): Promise<void> {
    const user = this.authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const exerciseDoc = doc(
      this.fireStore,
      `${this.collectionName}/${user.uid}/exercises/${id}`
    )
    await deleteDoc(exerciseDoc)
  }
}
