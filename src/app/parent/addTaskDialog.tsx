"use client";

import { useRef, useState } from "react";
import { addTask, IPerson } from "../apis";
import { FaChevronDown } from "react-icons/fa";

interface IAddTaskProps {
  people: IPerson[];
}
export default function AddTask({ people }: IAddTaskProps) {
  const [hideFields, setHideFields] = useState(true);
  const [sectionHeight, setSectionHeight] = useState(0);
  console.log(sectionHeight);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-xl bg-red-50 p-3 rounded-t-lg">
        <h1>Add a Task</h1>
        <FaChevronDown
          className="ms-auto"
          onClick={() => {
            setHideFields(!hideFields);
            setSectionHeight(ref?.current?.scrollHeight || 0);
          }}
        />
      </div>
      <form
        ref={ref}
        action={addTask}
        className={`${
          hideFields ? "max-h-[0px]" : `max-h-[182px]`
        } overflow-hidden p-3 rounded-b-lg bg-slate-50 
        gap-3 flex flex-col transition-all duration-300 ease-in
        `}
      >
        <div className="grid max-w-80 rounded-md">
          <label className="text-sm" htmlFor="task-text">
            Task:
          </label>
          <input
            className="p-1 border-1 border-slate rounded-xs"
            type="text"
            id="task-text"
            name="task-text"
            placeholder="Add"
          ></input>
        </div>
        <fieldset className="flex gap-3">
          <legend className="text-sm">Assigned To:</legend>
          {people?.map((person) => (
            <label key={person.id}>
              <input
                className="me-1"
                type="checkbox"
                name="person"
                value={person.id}
              />
              {person.name}
            </label>
          ))}
        </fieldset>
        <button
          className="max-w-40 bg-green-200 px-5 py-2 rounded-md text-sm hover:bg-green-300"
          type="submit"
          value="submit"
          formMethod="dialog"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
