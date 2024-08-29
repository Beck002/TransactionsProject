import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];


export const useBulkCreateTransactions = ()=>{
    
    const queryClient = useQueryClient() 

    const mutation = useMutation <
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async( json )=>{
            const response = await client.api.transactions["bulk-create"]["$post"]({json})
            return await response.json();  
        },
        onSuccess: ()=>{
            toast.success("Transactions Created")
            queryClient.invalidateQueries({ queryKey: ["transactions"]})
            // TODO: invalidate Summmary
        },
        onError: ()=>{
            toast.error("Failed to create Transactions"); 
        }
    })

    return mutation; 

}








