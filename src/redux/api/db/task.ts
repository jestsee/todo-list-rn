import { supabase } from '@constants/supabase'

const getTasks = async () => await supabase.from('task').select('*')
type TasksResponse = Awaited<ReturnType<typeof getTasks>>['data']

export { getTasks, TasksResponse }
