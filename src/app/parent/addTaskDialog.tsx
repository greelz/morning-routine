"use client";

import {useRef, useState} from "react";
import {addTask, IPerson} from "../apis";
import {FaChevronDown} from "react-icons/fa";
import FormPopup from "../components/FormPopup";

interface IAddTaskProps {
  people: IPerson[];
}
export default function AddTask({people}: IAddTaskProps) {
  console.log(sectionHeight);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <FormPopup action={addTask} title="Dialog Form" buttonCaption="Add Task">
      <>
        <label htmlFor="task-text">Task:</label>
        <input type="text" id="task-text" name="task-text" />
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
      </>
    </FormPopup>
    </div >
  );
}
