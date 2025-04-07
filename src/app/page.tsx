import Image from "next/image";
import {
  getPeople,
  getPeopleTasks,
  getTasks,
  IPeopleTask,
  IPerson,
  ITask,
} from "./apis";
import Link from "next/link";
import Zeke from "../../public/zeke.png";
import Kai from "../../public/kai.jpg";
import TaskSquare from "./TaskSquare";

export default async function Home() {
  const today = new Date();
  const people = await getPeople();
  const peopletasks = await getPeopleTasks();
  const tasks = await getTasks();
  interface IAllTasks {
    personId: number;
    name: string;
    tasks: ITask[];
  }
  function getTasksForEachPerson(
    people: IPerson[],
    tasks: ITask[],
    peopleTasks: IPeopleTask[]
  ): IAllTasks[] {
    // Step 1: Create a map of peopleTask by task_id for easy lookup
    const peopleTaskMap = new Map<number, number[]>();
    peopleTasks.forEach((pt) => {
      if (!peopleTaskMap.has(pt.task_id)) {
        peopleTaskMap.set(pt.task_id, []);
      }
      peopleTaskMap.get(pt.task_id)?.push(pt.person_id);
    });

    // Step 2: Create a list of tasks for each person
    const personTasks = people.map((person) => {
      // Start with tasks that apply to everyone
      const tasksForPerson = tasks.filter(
        (task) =>
          !peopleTaskMap.has(task.id) ||
          peopleTaskMap.get(task.id)?.includes(person.id)
      );

      return {
        personId: person.id,
        name: person.name,
        tasks: tasksForPerson,
      };
    });

    return personTasks;
  }

  const allTasks = getTasksForEachPerson(people, tasks, peopletasks);

  return (
    <div className="bg-blue-100 inline-flex flex-col min-w-full">
      <div className="flex flex-col p-7 bg-blue-100 relative">
        <Link
          href="/parent"
          className="absolute end-px top-px text-xs bg-orange-300 py-2 px-3 rounded-md"
        >
          Parent Mode
        </Link>
        <div className="text-[5vw] text-center">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="flex flex-row gap-2 bg-white">
        {people.map((p) => {
          return (
            <div key={p.id} className="min-w-100 relative">
              <div className="text-3xl bg-red-50 p-3 text-center flex flex-col justify-center items-center">
                <h1>{p.name}</h1>
                {p.name === "Zeke" && (
                  <Image
                    alt="Zeke"
                    src={Zeke}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                )}
                {p.name === "Kai" && (
                  <Image
                    alt="Kai"
                    src={Kai}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                )}
              </div>
              {allTasks
                .filter((a) => a.personId === p.id)
                .map((t) =>
                  t.tasks.map((task) => {
                    return (
                      <TaskSquare task={task} />
                    );
                  })
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
