import {
  FaChild
} from "react-icons/fa";
import {
  addTask,
  getPeople,
  getPeopleTasks,
  getTasks,
  IPeopleTask,
  IPerson,
} from "@/utilities/apis";
import DeleteTaskButton from "./deleteTaskButton";
import FormPopup from "@/components/FormPopup";
import TextField from "@/components/TextField";
import IconPicker from "@/components/IconPicker";
import TaskIcon from "@/components/TaskIcon";

export function getPeopleForTask(
  taskId: number,
  people: IPerson[],
  peopletasks: IPeopleTask[]
) {
  const uniquePersonIds = new Set(
    peopletasks.filter((pt) => pt.task_id === taskId).map((pt) => pt.person_id)
  );

  const filtered = people.filter((p) => uniquePersonIds.has(p.id));
  return filtered.length > 0 ? filtered : null;
}

export default async function Parent() {
  const people = await getPeople();
  const tasks = await getTasks();
  const peopletasks = await getPeopleTasks();

  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="flex flex-col">
        <h1 className="text-3xl bg-red-50 p-3 rounded-t-lg">Kids</h1>
        <div className="p-3 rounded-b-lg bg-slate-50">
          {people.map((p) => (
            <div key={p.id} className="flex items-center gap-2 py-2">
              <FaChild />
              <div>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-2xl">
        <h1 className="text-3xl bg-green-50 p-3">Tasks</h1>
        <div className="p-3 rounded-b-lg bg-slate-50">
          {tasks.map(async (t) => (
            <div
              key={t.id}
              className="grid grid-cols-[30px_1fr_1fr_auto] items-center gap-2 py-2 hover:[&>*]:opacity-100"
            >
              <TaskIcon iconKey={t.iconkey} />
              <div>{t.text}</div>
              <div className="ms-auto opacity-30 gap-2 flex">
                {getPeopleForTask(t.id, people, peopletasks)?.map((p) => (
                  <div key={p.id}>{p.name}</div>
                )) || "(all)"}
              </div>
              <DeleteTaskButton id={t.id} />
            </div>
          ))}
          <FormPopup action={addTask} title="Add a task" buttonCaption="Add Task">
            <>
              <div className="grid">
                <label htmlFor="task-text" className="text-sm text-gray-700">Task:</label>
                <TextField type="text" id="task-text" name="task-text" />
              </div>
              <fieldset className="flex gap-3">
                <legend className="text-sm text-gray-700">Assigned To:</legend>
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
              <IconPicker name="selected-icon" />
            </>
          </FormPopup>
        </div>
      </div>
    </div>
  );
}
