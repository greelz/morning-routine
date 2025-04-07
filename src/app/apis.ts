"use server";
import {neon, NeonQueryFunction} from "@neondatabase/serverless";
import {revalidatePath} from "next/cache";

function getSqlDb(): NeonQueryFunction<false, false> {
  return neon(`${process.env.DATABASE_URL}`);
}

export async function addPerson(name: string): Promise<number> {
  const sql = getSqlDb();

  const record = await sql`
        INSERT INTO people (name) 
        VALUES ${name} 
        RETURNING id`;
  revalidatePath("/");
  return record[0].id;
}

/**
 * Adds a task to the database 
 * @param formData - FormData object
 *                   Expected fields:
 *                   - task-text: Task description
 *                   - person: number[] associated with person IDs ([1, 2])
 * @returns A promise that resolves after all database inserts
 */
export async function addTask(formData: FormData): Promise<void> {
  const sql = getSqlDb();

  const text = formData.get("task-text");
  const people = formData.getAll("person");

  const record = await sql`
        INSERT INTO tasks (text) 
        VALUES (${text})
        RETURNING id`;
  const taskId = record[0].id;

  people.forEach(async (person) => {
    await sql`
        INSERT INTO peopletasks (task_id, person_id)
        VALUES (${taskId}, ${person})
    `;
  });

  revalidatePath("/");
}

export async function deleteTask(id: number) {
  const sql = getSqlDb();
  console.log("here");

  await sql`
    DELETE FROM tasks
    WHERE id = ${id}`;
  revalidatePath("/");
}

interface IId {
  id: number;
}
export interface IPerson extends IId {
  name: string;
}
export interface IPeopleTask extends IId {
  task_id: number;
  person_id: number;
}
export interface ITask extends IId {
  text: string;
}

export async function getPeople(): Promise<IPerson[]> {
  const sql = getSqlDb();
  return (await sql`SELECT * FROM people`) as IPerson[];
}

export async function getTasks(): Promise<ITask[]> {
  const sql = getSqlDb();
  return (await sql`SELECT * FROM tasks`) as ITask[];
}

export async function getPeopleTasks(): Promise<IPeopleTask[]> {
  const sql = getSqlDb();
  return (await sql`SELECT * FROM peopletasks`) as IPeopleTask[];
}
