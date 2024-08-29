import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { CategoryForm } from "./category-form";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";


const formSchema = insertCategorySchema.pick({
    name: true
}); 

type FormValues = z.input< typeof formSchema >; 



export const EditCategorySheet = ()=>{

    const { isOpen, onClose, id } = useOpenCategory(); 
    
    const categoryQuery = useGetCategory( id );
    const editMutation = useEditCategory( id ); 
    const deleteMutation = useDeleteCategory( id ); 

    const isLoading = categoryQuery.isLoading;  
    const isPending = editMutation.isPending || deleteMutation.isPending; 

    const onSubmit = ( values : FormValues )=>{
        editMutation.mutate( values,{
            onSuccess: ()=>{
                onClose(); 
            }
        })
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } : {
        name: ""
    }


    return(
        <Sheet open={isOpen} onOpenChange={onClose} >
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit category
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing category
                    </SheetDescription>
                </SheetHeader>

                { isLoading 
                    ?(
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2  className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ) : (
                        <CategoryForm 
                            id={id}
                            onSubmit={onSubmit} 
                            disabled={isPending}
                            defaultValues={defaultValues} 
                            onDelete={()=> deleteMutation.mutate() }
                        />

                    )

                    
                }

            </SheetContent>
        </Sheet>
    );
}; 

