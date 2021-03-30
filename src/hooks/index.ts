import moment from "moment";
import { useEffect, useState } from "react";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

type Task = {
  id?: string;
  archived?: boolean;
  date?: string;
  projectId?: string;
  task?: string;
  userId?: string;
};

export const useTasks = (selectedProject: string | number) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "MXHMcYrLWrLprumJNeCx");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    // @ts-ignore
    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks: Task[] = snapshot.docs.map((task) => {
        return {
          id: task.id,
          ...task.data(),
        };
      });

      setTasks(
        selectedProject === "NEXT_WK"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    // @ts-ignore
    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
