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

  //  { ================ REACT QUERY HOOKS ============== } 
  const getTodo = useGetMutation();
  const deleteTodo = useDeleteMutation();
  //  { ============= HOOK FOR SEARCHING DATA ============ }
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  //  { ============ THIS HOOK FOR TO GET ALL DATA ========== }
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

  //  { =================== FIND DATA BY INPUT SEARCH ============ }
  const Pending = todo.filter(
    (t) => t.status?.toLowerCase() === "pending"
  ).length;

  const complete = todo.filter(
    (t) => t.status?.toLowerCase() === "completed"
  ).length;

  //  { ========= FILTER DATA BY SELECT TAGS ============= }
  const searchData = todo.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      t.status?.toLowerCase() === statusFilter;

    const matchesPriority =
      priorityFilter === "" ||
      t.priority?.toLowerCase() === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  //  { ================= PAGINATION HOOK ============ }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //  { ================ PAGINATION CALCULATION ============== }
  const totalPages = Math.ceil(searchData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = searchData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete!")) return;
    setTodo((prev) => prev.filter((d) => d.id !== id));
    deleteTodo.mutate(id);
  };

  return (
    <div className="min-h-screen w-full md:w-6xl bg-[#0a0a0d] text-gray-200 font-sans p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs tracking-widest uppercase text-gray-400">
          Todo List
        </p>
            {/* { ================== TODO FORM ============= } */}
        <TodoModal todo={todo} setTodo={setTodo} />
      </div>

      {/* { ================ STATUS CARDS ======================== } */}

      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-gradient-to-br from-[#1a1a1f] to-[#121215] border border-[#2a2a30] rounded-2xl p-5">
          <p className="text-gray-400 text-xs uppercase">Total Todo</p>
          <h2 className="text-3xl font-semibold mt-2">
            {todo.length}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-yellow-950/40 to-[#121215] border border-yellow-800/40 rounded-2xl p-5">
          <p className="text-yellow-400 text-xs uppercase">Pending</p>
          <h2 className="text-3xl font-semibold text-yellow-300 mt-2">
            {Pending}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-green-950/40 to-[#121215] border border-green-800/40 rounded-2xl p-5">
          <p className="text-green-400 text-xs uppercase">Complete</p>
          <h2 className="text-3xl font-semibold text-green-300 mt-2">
            {complete}
          </h2>
        </div>

      </div>

       {/* [======================== SEARCHING DATA ========================= ] */}

      <div className="p-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

        <div className="flex-1">
          <SearchTodo
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="flex gap-3">

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0f0f11] border border-yellow-50 text-gray-300 text-sm rounded-lg px-4 py-4"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#0f0f11] border border-yellow-50  text-gray-300 text-sm rounded-lg px-3 py-2"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

        </div>
      </div>

       {/* { ========================= TODO TABLE ===================== } */}

     <div className=" md:block bg-[#0f0f11] rounded-xl border border-[#2a2a30] overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-[#121214] text-gray-400 uppercase text-xs">
            <tr>
              {["Id","Title","Description","Status","Priority","Action"]
                .map((h) => (
                <th key={h} className="text-left px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              paginatedData.map((t) => (
                <tr key={t.id} className="border-b border-[#1e1e24]">

                  <td className="px-4 py-3">{t.id}</td>

                  <td className="px-4 py-3 font-medium">
                    {t.title}
                  </td>

                  <td className="px-4 py-3 text-gray-400">
                    {t.description}
                  </td>

                  <td className="px-4 py-3">
                    {t.status}
                  </td>

                  <td className="px-4 py-3">
                    {t.priority}
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    {/* { =============== UPDATE TODO MODAL ================= } */}
                    <UpdateTodoModal
                      updateTtodo={t}
                      setUpdateTodo={setUpdateTodo}
                    />

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="px-2 py-1 bg-red-600 rounded text-white"
                    >
                      <Trash size={18}/>
                    </button>

                  </td>

                </tr>
              ))
            )}

            <tr>
              <td colSpan={6} className="py-4 px-4">

                <div className="flex justify-between items-center">

                  <span className="text-xs text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>

                  <div className="flex gap-2">

                    <button
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((p) => p - 1)
                      }
                      className="px-3 py-1 text-xs bg-[#1a1a1f] border border-[#2a2a30] rounded disabled:opacity-40"
                    >
                      Prev
                    </button>
                     Page: {currentPage} 
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => p + 1)
                      }
                      className="px-3 py-1 text-xs bg-[#1a1a1f] border border-[#2a2a30] rounded disabled:opacity-40"
                    >
                      Next
                    </button>

                  </div>

                </div>

              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TodoTable;