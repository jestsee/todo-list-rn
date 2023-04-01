import { Database } from '@custom-types/supabase'
import { supabase } from '@constants/supabase'

// TODO get task berdasarkan created_by = id
const getTasks = async (userId: string) =>
  await supabase.from('task').select('*').eq('created_by', userId)
type TasksResponse = Awaited<ReturnType<typeof getTasks>>['data']

type AddTaskPayload = Database['public']['Tables']['task']['Insert']
const addTask = async (newTask: AddTaskPayload) =>
  await supabase.from('task').insert(newTask).select()

type UpdateTaskPayload = Database['public']['Tables']['task']['Update']
const updateTask = async (updatedTask: UpdateTaskPayload) =>
  await supabase.from('task').update(updatedTask).eq('id', updatedTask.id)

const deleteTask = async (id: string) =>
  supabase.from('task').delete().eq('id', id)

export {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  TasksResponse,
  AddTaskPayload,
  UpdateTaskPayload
}
