import { Injectable } from '@angular/core'
import {
  addDoc,
  collectionData,
  docData,
  Firestore,
} from '@angular/fire/firestore'
import { Exercise } from '../../models/exercise.model'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private collectionName = 'Exercises'
  constructor(private fireStore: Firestore) {}

  //crear ejercicio
  async addExercise(exercise: Exercise): Promise<void> {
    const itemCollection = collection(this.fireStore, this.collectionName)
    await addDoc(itemCollection, exercise)
  }

  //obtener todos los ejercicios
  getExercises(): Observable<any[]> {
    const itemCollection = collection(this.fireStore, this.collectionName)
    return collectionData(itemCollection, { idField: 'id' })
  }

  //obtener un ejercicio por id
  getExerciseById(id: string): Observable<any> {
    const itemDoc = doc(this.fireStore, `${this.collectionName}/${id}`)
    return docData(itemDoc, { idField: 'id' })
  }

  //update an exercise
  async updateExercise(id: string, exercise: any): Promise<void> {
    const itemDoc = doc(this.fireStore, `${this.collectionName}/${id}`)
    await updateDoc(itemDoc, exercise)
  }

  //delete an exercise
  async deleteExercise(id: string): Promise<void> {
    const itemDoc = doc(this.fireStore, `${this.collectionName}/${id}`)
    await deleteDoc(itemDoc)
  }
}
