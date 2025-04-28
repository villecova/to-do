export interface Todo {
  id: number
  title: string
  description: string
  dueDate: Date
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}
