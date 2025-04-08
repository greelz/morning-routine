'use client'
import {completeTask, uncompleteTask, ITask} from "@/utilities/apis"
import {FaRegCircleDot} from "react-icons/fa6";
import Icon from "./Icon";

interface ITaskSquare {
  task: ITask;
  personId: number;
  completed: boolean;
}

export default function TaskSquare({task, personId, completed}: ITaskSquare) {
  return (
    <form action={() => {
      if (!completed) completeTask(task.id, personId);
      else uncompleteTask(task.id, personId);
    }}>
      <button
        type="submit"
        className={`flex flex-col gap-2 w-full h-70 place-items-center border-x-1 border-b-1 border-gray-200 hover:cursor-pointer ${completed ? "bg-green-200" : null}`}
      >
        <div className="h-[70%]">
          <Icon iconKey={task.iconkey} />

        </div>
        <div className="h-10">
          <FaRegCircleDot className="w-full h-full pulse" />
        </div>
        <div>{task.text}</div>
      </button>
    </form>
  );
}
