import { useMutation , useQueryClient } from "@tanstack/react-query";
import { UPDATE } from "../todo-action/todo-action";
import { Todo } from "../todo-action/todo-action";

export const useUpdateMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: async (data: {id: number , todo: Todo}) => {
                await UPDATE(data.id , data.todo)
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['todo']})
        }
    })
}