"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { usePostMutation } from "../hooks/post-todo";

interface Todo {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
}

interface Props {
  todo: Todo[] | null;
  setTodo: Dispatch<SetStateAction<Todo[]>> | null;
}

const TodoModal = ({ todo, setTodo }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("Medium");
  const [isOpen, setIsOpen] = useState(false);

  //  { ============= REACT QUERY HOOK ============== }
  const useTodo = usePostMutation();

  //  { ============== CLEAR INPUT FIELD FUNCITON ============ }
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setPriority("Medium");
    setIsOpen(false);
  };
  //  { ======================== HANDLE ADD DATA FUNCTION ============= }
  const handleSubmite = async () => {
    if (!title) return alert("Please fill the title field!");

    const todoData: Todo = {
      id: Date.now(),
      title,
      description: description || "",
      status,
      priority,
    };

    try {
      const newTodoFromAPI = await useTodo.mutateAsync(todoData);

      const newTodo: Todo = {
        ...newTodoFromAPI,
        description: newTodoFromAPI.description || "",
      };

      setTodo?.((prev) => [...(prev || []), newTodo]);
      clearForm();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col font-mono px-4">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-4 py-2 cursor-pointer border border-white text-white bg-black hover:bg-green-900 rounded-lg duration-300"
      >
        Add todo
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-3">
          <div className="w-full max-w-md sm:max-w-lg bg-[#0f0f11] border border-[#2a2a30] shadow-[0_0_0_1px_#1a1a20,0_40px_80px_rgba(0,0,0,0.8)] rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#1e1e24]">
              <p className="text-xs tracking-[0.18em] uppercase text-gray-400">
                New Task
              </p>
            </div>

            <form>
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4">
                <div>
                  <label className="block mb-1 text-[10px] tracking-[0.14em] uppercase text-gray-500">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-sm px-3 py-2 rounded transition"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[10px] tracking-[0.14em] uppercase text-gray-500">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details..."
                    className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-sm px-3 py-2 rounded min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[10px] tracking-[0.14em] uppercase text-gray-500">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-sm px-3 py-2 rounded"
                  >
                    <option className="bg-[#0f0f11]" value="pending">
                      Pending
                    </option>
                    <option className="bg-[#0f0f11]" value="in-completed">
                      In-completed
                    </option>
                    <option className="bg-[#0f0f11]" value="completed">
                      Completed
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-[10px] tracking-[0.14em] uppercase text-gray-500">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#16161a] border border-[#252529] focus:border-[#444] outline-none text-gray-200 text-sm px-3 py-2 rounded"
                  >
                    <option className="bg-[#0f0f11]" value="Low">
                      Low
                    </option>
                    <option className="bg-[#0f0f11]" value="Medium">
                      Medium
                    </option>
                    <option className="bg-[#0f0f11]" value="High">
                      High
                    </option>
                  </select>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-4 border-t border-[#1e1e24] flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto bg-red-700 text-white text-xs uppercase px-5 py-2 rounded font-semibold hover:bg-red-800 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmite();
                  }}
                  className="w-full sm:w-auto bg-gray-200 text-[#0f0f11] text-xs uppercase px-5 py-2 rounded font-semibold hover:bg-white transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoModal;