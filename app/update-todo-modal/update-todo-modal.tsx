"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Todo } from "../todo-action/todo-action";
import { useUpdateMutation } from "../hooks/update-todo";
import { Pencil } from "lucide-react";

interface Props {
  updateTtodo: Todo;
  setUpdateTodo: Dispatch<SetStateAction<Todo[]>>;
}

const UpdateTodoModal = ({ updateTtodo, setUpdateTodo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateTodo = useUpdateMutation();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const openModal = () => {
    setTitle(updateTtodo.title);
    setDescription(updateTtodo.description || "");
    setStatus(updateTtodo.status);
    setPriority(updateTtodo.priority);
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    const todoData: Todo = {
      id: updateTtodo.id,
      title,
      description: description || '',
      status,
      priority,
    };

    try {
      await updateTodo.mutateAsync({ id: updateTtodo.id, todo: todoData });

      setUpdateTodo(prev =>
        prev.map(t =>
          t.id === updateTtodo.id
            ? { ...t, title, description, status, priority }
            : t
        )
      );
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col font-mono">
  <button
    onClick={openModal}
    className="p-2 cursor-pointer border border-white text-white bg-black hover:bg-green-900 rounded-lg duration-300"
  >
    <Pencil size={12} />
  </button>

  {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-3 sm:px-4">
      {/* modal container */}
      <div className="w-full max-w-md sm:max-w-lg bg-[#0f0f11] border border-[#2a2a30] shadow-[0_0_0_1px_#1a1a20,0_40px_80px_rgba(0,0,0,0.8)] rounded-lg">

        {/* header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#1e1e24]">
          <p className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-gray-400">
            Update Task
          </p>
        </div>

        <form>
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">

            {/* Title */}
            <div>
              <label className="block mb-1 sm:mb-2 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-gray-500">
                Title
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-xs sm:text-sm px-3 py-2 rounded-sm transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 sm:mb-2 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-gray-500">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add details or context..."
                className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-xs sm:text-sm px-3 py-2 rounded-sm min-h-[70px] sm:min-h-[80px] resize-y transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 sm:mb-2 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-gray-500">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-xs sm:text-sm px-3 py-2 rounded-sm transition"
              >
                <option className="bg-[#0f0f11]">--Select Status--</option>
                <option className="bg-[#0f0f11]">pending</option>
                <option className="bg-[#0f0f11]">in-completed</option>
                <option className="bg-[#0f0f11]">completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-1 sm:mb-2 text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-gray-500">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-xs sm:text-sm px-3 py-2 rounded-sm transition"
              >
                <option className="bg-[#0f0f11]">--Select Priority--</option>
                <option className="bg-[#0f0f11]">Low</option>
                <option className="bg-[#0f0f11]">Medium</option>
                <option className="bg-[#0f0f11]">High</option>
              </select>
            </div>

          </div>

          {/* footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#1e1e24] flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto bg-red-700 text-white text-[10px] sm:text-[11px] tracking-[0.1em] uppercase px-4 sm:px-5 py-2 rounded-sm font-semibold hover:bg-red-800 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              className="w-full sm:w-auto bg-gray-200 text-[#0f0f11] text-[10px] sm:text-[11px] tracking-[0.1em] uppercase px-4 sm:px-5 py-2 rounded-sm font-semibold hover:bg-white transition"
            >
              Update Task
            </button>
          </div>

        </form>
      </div>
    </div>
  )}
</div>
  );
};

export default UpdateTodoModal;