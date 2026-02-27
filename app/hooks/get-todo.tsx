import { useMutation , useQueryClient } from "@tanstack/react-query";
import { GET } from "../todo-action/todo-action";


export const useGetMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: GET,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['todo']})
        }
    })
}