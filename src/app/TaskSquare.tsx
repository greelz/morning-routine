import {FaRegCircle} from "react-icons/fa";
import {ITask} from "./apis"

interface ITaskSquare {
  task: ITask;
}

export default function TaskSquare({task}: ITaskSquare) {
  return <div
    className="h-50 place-items-center border-x-1 border-b-1 border-gray-200"
    key={task.id}
  >
    <FaRegCircle height={100} width={100} />
    <div>{task.text}</div>
  </div>
}
