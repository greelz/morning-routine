"use client";

import {FaRegTrashAlt} from "react-icons/fa";
import {deleteTask} from "@/utilities/apis";

interface IDeleteTaskButtonProps {
  id: number;
}
export default function DeleteTaskButton({id}: IDeleteTaskButtonProps) {
  return (
    <div
      onClick={() => deleteTask(id)}
      className="p-1 opacity-30 transition-opacity duration-200 linear hover:cursor-pointer"
    >
      <FaRegTrashAlt />
    </div>
  );
}
