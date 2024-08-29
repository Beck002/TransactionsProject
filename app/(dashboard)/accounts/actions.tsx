"use client";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useConfirm } from "@/hooks/use-confirm";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

 



type Props = {
    id: string
}

export  const Actions = ({ id } : Props)=>{

    const[ ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction."
    )

    const deleteMutation = useDeleteAccount(id)
    const { onOpen }     = useOpenAccount(); 

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