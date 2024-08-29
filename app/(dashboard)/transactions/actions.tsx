"use client";

import { useConfirm } from "@/hooks/use-confirm";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { useOpenTransactions } from "@/features/transactions/hooks/use-open-transactions";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

 



type Props = {
    id: string
}

export  const Actions = ({ id } : Props)=>{

    const[ ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction."
    )

    const deleteMutation = useDeleteTransaction(id)
    const { onOpen } = useOpenTransactions(); 

    const handleDelete = async()=>{

        const ok = await confirm(); 

        if(ok){
            deleteMutation.mutate()
        }
    }

    return (
        <>
            <ConfirmationDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={false}
                        onClick={()=>onOpen(id)}
                    >
                        <Edit className="size-4 mr-2"/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        
        
        </>

    )
}