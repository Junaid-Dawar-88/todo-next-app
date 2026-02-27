import { useMutation , useQueryClient } from "@tanstack/react-query";
import POST from "../todo-action/todo-action";


export const   usePostMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: POST,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['todo']})
        }
    })
}