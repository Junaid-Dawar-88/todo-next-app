import { useMutation , useQueryClient } from "@tanstack/react-query";
import { DELETE } from "../todo-action/todo-action";

export const useDeleteMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: async(id: number) => {
             await DELETE(id)
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['todo']})
        }
    })
}