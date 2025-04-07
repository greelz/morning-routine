import {addTask, IPerson} from "../apis";
import FormPopup from "../components/FormPopup";

interface IAddTaskProps {
  people: IPerson[];
}
export default function AddTask({people}: IAddTaskProps) {
  return (
    <FormPopup action={addTask} title="Add a task" buttonCaption="Add Task">
      <>
        <div>
          <label htmlFor="task-text text-sm">Task:</label>
          <input type="text" id="task-text" name="task-text" />
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
      </>
    </FormPopup>
  );
}
