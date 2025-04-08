'use client'
import {useState} from "react";
import {completeTask, uncompleteTask, ITask} from "@/utilities/apis"
import {FaRegCircleDot} from "react-icons/fa6";
import Icon from "./Icon";
import {CelebrationPopup} from "./CelebrationPopup";

interface ITaskSquare {
  task: ITask;
  personId: number;
  completed: boolean;
}

export default function TaskSquare({task, personId, completed}: ITaskSquare) {
  const celebrationPopupLength = 5000;
  const [showCelebration, setShowCelebration] = useState(false);
  return (
    <>
      {showCelebration && <CelebrationPopup
        title="😀 You did it!"
        msDisplay={celebrationPopupLength}>
          <Icon iconKey={task.iconkey} />
        </CelebrationPopup>
      }
      <form action={() => {
        if (!completed) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), celebrationPopupLength);
          completeTask(task.id, personId);
        }
        else {
          uncompleteTask(task.id, personId);
        }
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
    </>
  );
}
