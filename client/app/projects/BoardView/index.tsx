import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  console.log("Tasks in BoardView:", tasks);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    "Completed": "#FFFFFFFF",
  };

  return (
    <div
    ref={(instance) => {
      drop(instance);
    }}
    className={`sl:py-4 rounded-xl py-2 xl:px-2 transition-colors
      ${isOver ? "bg-zinc-900/40" : ""}
    `}
  >
    <div className="mb-3 flex w-full">
      {/* Status strip */}
      <div
        className="w-2 rounded-s-xl"
        style={{ backgroundColor: statusColor[status] }}
      />
  
      <div
        className="flex w-full items-center justify-between rounded-e-xl
                   bg-zinc-50 dark:bg-[#101010]
                   px-5 py-4
                   border border-zinc-200/70 dark:border-zinc-800"
      >
        <h3 className="flex items-center text-lg font-semibold
                       text-zinc-900 dark:text-zinc-100">
          {status}
          <span
            className="ml-2 inline-flex items-center justify-center rounded-full
                       bg-zinc-200 dark:bg-zinc-800
                       text-zinc-700 dark:text-zinc-300
                       text-sm font-medium"
            style={{ width: "1.5rem", height: "1.5rem" }}
          >
            {tasksCount}
          </span>
        </h3>
  
        <div className="flex items-center gap-1">
          {/* More */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded-md
                       text-zinc-500 hover:text-zinc-900
                       dark:text-zinc-400 dark:hover:text-zinc-100
                       hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60
                       transition"
            title="More options"
          >
            <EllipsisVertical size={20} />
          </button>
  
          {/* Add */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded-md
                       bg-zinc-900 hover:bg-zinc-800
                       dark:bg-zinc-800 dark:hover:bg-zinc-700
                       text-zinc-100
                       shadow-sm
                       transition"
            onClick={() => setIsModalNewTaskOpen(true)}
            title="Add new task"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  
  

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
  ref={(instance) => {
    drag(instance);
  }}
  className={`mb-4 rounded-md
              bg-white shadow-md
              dark:bg-[#101010]
              ${isDragging ? "opacity-50" : "opacity-100"}
              transition`}
>
  {task.attachments && task.attachments.length > 0 && (
    <Image
      src={`/${task.attachments[0].fileURL!}`}
      alt={task.attachments[0].fileName}
      width={400}
      height={200}
      className="h-auto w-full rounded-t-md"
    />
  )}

  <div className="p-4 md:p-6">
    <div className="flex items-start justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {task.priority && <PriorityTag priority={task.priority} />}

        <div className="flex gap-1.5">
          {taskTagsSplit.map((tag) => (
            <div
              key={tag}
              className="rounded-full
                         bg-zinc-800
                         px-2 py-0.5
                         text-xs font-medium
                         text-zinc-300"
            >
              {" "}
              {tag}
            </div>
          ))}
        </div>
      </div>

      <button
        className="flex h-6 w-6 items-center justify-center rounded-md
                   text-zinc-400 hover:text-zinc-100
                   hover:bg-zinc-800/60
                   transition"
        title="More options"
      >
        <EllipsisVertical size={18} />
      </button>
    </div>

    <div className="my-3 flex items-center justify-between">
      <h4 className="text-sm font-semibold text-zinc-100">
        {task.title}
      </h4>

      {typeof task.points === "number" && (
        <div className="text-xs font-semibold text-zinc-300">
          {task.points} pts
        </div>
      )}
    </div>

    <div className="text-xs text-zinc-400">
      {formattedStartDate && <span>{formattedStartDate} – </span>}
      {formattedDueDate && <span>{formattedDueDate}</span>}
    </div>

    <p className="mt-1 text-sm text-zinc-300">
      {task.description}
    </p>

    <div className="mt-4 border-t border-zinc-700" />

    {/* Users */}
    <div className="mt-3 flex items-center justify-between">
      <div className="flex -space-x-[6px] overflow-hidden">
        {task.assignee && (
          <Image
            key={task.assignee.userId}
            src={`/${task.assignee.profilePictureUrl!}`}
            alt={task.assignee.username}
            width={30}
            height={30}
            className="h-8 w-8 rounded-full border-2 border-zinc-900 object-cover dark:border-zinc-800"
          />
        )}
        {task.author && (
          <Image
            key={task.author.userId}
            src={`/${task.author.profilePictureUrl!}`}
            alt={task.author.username}
            width={30}
            height={30}
            className="h-8 w-8 rounded-full border-2 border-zinc-900 object-cover dark:border-zinc-800"
          />
        )}
      </div>
      <div className="flex items-center text-zinc-400">
        <MessageSquareMore size={20} />
        <span className="ml-1 text-sm text-zinc-300">
          {numberOfComments}
        </span>
      </div>
    </div>
  </div>
</div>

  );
};

export default BoardView;