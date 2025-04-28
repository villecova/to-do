export interface UserWeight {
  userName: string
  weight: number
}

export interface WorkoutList {
  id: string
  name: string
  reps: number
  sets: number
  weight: number | UserWeight[] // Single weight for personal, array for cooperative
  completed?: boolean
}

export interface Workout {
  id: string
  name: string
  description?: number
  type: 'personal' | 'cooperative'
  exercises: WorkoutList[]
}

export interface Exercise {
  id: string
  name: string
  description: string
  type: 'personal' | 'shared'
  createdBy: string
  createdAt: Date
  sets: number
  reps: number
  weight?: number
  notes?: string
}
