import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'

const TodoList = ({account,addTask,task}) => <div className='w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll'>
  <Navbar />
  <h2 className='text-4xl bolder text-white pb-8'>
    What&apos;s up, Kevin {account}
  </h2>
  <div className='py-3 text-[#7d99e9]'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    {task.map(item=>{return(

      <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
      placeholder='Add a task for today...'
      // take input from the form here
      defaultValue={item.msg}
      />
      )})}
    <IoMdAddCircle
      // Add an onClick method
      onClick={()=>addTask()}
      className='text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
    {/* Loop through all tasks here using the Task component */}
  </ul>
</div>

export default TodoList