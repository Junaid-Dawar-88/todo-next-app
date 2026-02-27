"use client";
import React, { useEffect, useState } from "react";
import TodoModal from "../todo-modal/todo-modal";
import { useGetMutation } from "../hooks/get-todo";
import { Todo } from "../todo-action/todo-action";
import { useDeleteMutation } from "../hooks/delete-todo";
import UpdateTodoModal from "../update-todo-modal/update-todo-modal";
import { Trash } from "lucide-react";
import SearchTodo from "../search-todo/search-todo";

const TodoTable = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [updateTodo, setUpdateTodo] = useState<Todo[]>([]);
  const getTodo = useGetMutation();
  const deleteTodo = useDeleteMutation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodo.mutateAsync();

        const sanitizedData: Todo[] = data.map((t: any) => ({
          ...t,
          description: t.description || "",
        }));

        setTodo(sanitizedData);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const searchData = todo.filter((S) =>
    S.title.toLowerCase().includes(search.toLowerCase()) ||
    S.description?.toLowerCase().includes(search.toLowerCase()) ||
    S.status?.toLowerCase().includes(search.toLowerCase()) ||
    S.priority?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete!")) return;
    setTodo(prev => prev.filter(d => d.id !== id));
    deleteTodo.mutate(id);
  };

  return (
    <div className="min-h-screen w-full md:w-6xl bg-[#0a0a0d] text-gray-200 font-sans p-4 md:p-6">

      <div className="flex items-center justify-between mb-6">
        <p className="text-xs tracking-widest uppercase text-gray-400">
          Todo List
        </p>
        <TodoModal todo={todo} setTodo={setTodo} />
      </div>

      <div className="p-3">
        <SearchTodo search={search} setSearch={setSearch} />
      </div>

      <div className="hidden md:block bg-[#0f0f11] rounded-xl border border-[#2a2a30] overflow-x-auto shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#121214] text-gray-400 uppercase text-xs tracking-wide">
            <tr>
              {["Id", "Title", "Description", "Status", "Priority", "Action"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {searchData.length === 0 ? (
              <tr className="border-b border-[#1e1e24]">
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500 text-xs tracking-wide"
                >
                  No tasks found
                </td>
              </tr>
            ) : (
              searchData.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-[#1e1e24] hover:bg-[#1a1a1f] transition-all rounded-lg"
                >
                  <td className="px-4 py-3">{t.id}</td>
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3 text-gray-400">{t.description}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-yellow-950 text-yellow-400 text-xs font-semibold">
                      {t.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-semibold">
                      {t.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <UpdateTodoModal
                      updateTtodo={t}
                      setUpdateTodo={setUpdateTodo}
                    />

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {searchData.length === 0 ? (
          <p className="text-center text-gray-500 text-xs tracking-wide mt-4">
            No tasks found
          </p>
        ) : (
          searchData.map((t) => (
            <div
              key={t.id}
              className="bg-gradient-to-br from-[#1a1a1f] to-[#121215] border border-[#2a2a30] rounded-2xl p-5 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  ID
                </span>
                <span className="text-white font-medium">{t.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  Title
                </span>
                <span className="text-white font-medium">{t.title}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  Description
                </span>
                <span className="text-gray-300 text-sm">
                  {t.description}
                </span>
              </div>

              <div className="flex justify-between gap-4 mt-2">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-semibold uppercase">
                    Status
                  </span>
                  <span className="px-3 py-1 rounded-full bg-yellow-950 text-yellow-400 text-xs mt-1">
                    {t.status}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-semibold uppercase">
                    Priority
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs mt-1">
                    {t.priority}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <UpdateTodoModal
                  updateTtodo={t}
                  setUpdateTodo={setUpdateTodo}
                />

                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white transition flex items-center gap-1"
                >
                  <Trash size={18} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoTable;