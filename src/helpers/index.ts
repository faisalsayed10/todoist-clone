import { collatedTasks } from "../constants";

export const collatedTasksExist = (selectedProject: string | number) =>
  collatedTasks.find((task) => task.key === selectedProject);
