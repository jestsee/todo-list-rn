import { supabase } from '@constants/supabase'

const getProfile = async () =>
  await supabase.from('profiles').select('*').limit(1)
type ProfileResponse = Awaited<ReturnType<typeof getProfile>>['data']

export { getProfile, ProfileResponse }
