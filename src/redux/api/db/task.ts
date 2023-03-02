import { Database } from '@custom-types/supabase'
import { supabase } from '@constants/supabase'

const getTasks = async () => await supabase.from('task').select('*')
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

// TODO
// hook useTask -> addTask, deleteTask, ..
// kalo berhasil add maka nambah arraynya
// delete & update juga berubah arraynya
