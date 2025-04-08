import Image from "next/image";
import {
  getPeople,
  getPeopleTasks,
  getTaskCompletions,
  getTasks,
  IPeopleTask,
  IPerson,
  ITask,
  ITaskCompletion,
} from "@/utilities/apis";
import Link from "next/link";
import Zeke from "@/public/zeke.png";
import Kai from "@/public/kai.jpg";
import TaskSquare from "@/components/TaskSquare";
import {isSameDay} from "@/utilities/utils";
import {CelebrationPopup} from "@/components/CelebrationPopup";
import {IconKeys} from "@/components/Icon";

export default async function Home() {
  const people = await getPeople();
  const peopletasks = await getPeopleTasks();
  const tasks = await getTasks();
  const taskCompletions = await getTaskCompletions();

  interface IAllTasks {
    personId: number;
    name: string;
    tasks: ITask[];
  }
  function getCompletedTaskIdsForPersonToday(
    completions: ITaskCompletion[],
    personId: number,
  ): number[] {
    const today = new Date();
    return completions
      .filter((c) => c.person_id === personId && isSameDay(c.completed_at_date, today))
      .map((c) => c.task_id);
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
        <CelebrationPopup title="Hello" iconKey={IconKeys.Breakfast} text="More words here" />
        {people.map((p) => {
          const completedTasks = getCompletedTaskIdsForPersonToday(taskCompletions, p.id);
          return (
            <div key={p.id} className="relative">
              <div className="h-40 w-100 text-3xl bg-red-50 p-3 text-center flex flex-col justify-center items-center">
                <h1 className="truncate w-90">{p.name}</h1>
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
                      <TaskSquare
                        key={task.id}
                        task={task}
                        personId={p.id}
                        completed={completedTasks.includes(task.id)} />
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
