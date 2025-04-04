"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTask } from "../apis";

interface IDeleteTaskButtonProps {
  id: number;
}
export default function DeleteTaskButton({ id }: IDeleteTaskButtonProps) {
  return (
    <FaRegTrashAlt
      onClick={() => deleteTask(id)}
      className="opacity-30 transition-opacity duration-200 linear"
    />
  );
}
