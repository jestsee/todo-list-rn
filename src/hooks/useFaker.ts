import { Subtask, Task } from '@custom-types/task'
import { faker } from '@faker-js/faker'

const useFaker = () => {
  const priority = ['low', 'medium', 'high']

  const generatePriority = () =>
    priority[Math.floor(Math.random() * priority.length)]

  const generateTask = (created_by: string, nSubtask?: number): Task => ({
    created_by,
    id: faker.datatype.uuid(),
    title: faker.random.word(),
    priority: generatePriority(),
    subtask: Array.from({ length: nSubtask ?? 3 }, () => generateSubtask())
  })

  const generateSubtask = (): Subtask => ({
    checked: faker.datatype.boolean(),
    text: faker.commerce.product()
  })

  return { generateTask, generateSubtask, generatePriority }
}

export default useFaker
