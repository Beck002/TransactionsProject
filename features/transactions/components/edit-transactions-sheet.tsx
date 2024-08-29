import { z } from "zod";

import { insertTransactionSchema } from "@/db/schema";
/* ------- FEATURES IMPORTS ---------- */
import { useGetTransaction }    from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction }   from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransactions }  from "@/features/transactions/hooks/use-open-transactions";
import { TransactionForm }      from "@/features/transactions/components/transaction-form";

import { useGetCategories }  from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useGetAccounts }   from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { 
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";    
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertTransactionSchema.omit({
    id: true
}); 

type FormValues = z.input< typeof formSchema >; 



export const EditTransactionSheet = ()=>{

    const { isOpen, onClose, id } = useOpenTransactions(); 

    const  [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction."
    )

    /*---------TRANSACTIONS---------*/
    const transactionQuery = useGetTransaction( id );
    const editMutation     = useEditTransaction( id ); 
    const deleteMutation   = useDeleteTransaction( id ); 


    /*<---------> CATEGORIES <--------->*/

    const categoryQuery    = useGetCategories();
    const categoryMutation = useCreateCategory(); 
    const onCreateCategory = ( name: string )=> categoryMutation.mutate({ name });

    const categoryOptions = (categoryQuery.data ?? []).map((category)=>({
        label: category.name,
        value: category.id,
    }));

    /*<---------> ACCOUNTS <--------->*/

    const accountsQuery   = useGetAccounts();
    const accountMutation = useCreateAccount(); 
    const onCreateAccount = ( name: string )=> accountMutation.mutate({ name });

    const accountOptions = ( accountsQuery.data ?? []).map(( account ) =>({
        label: account.name,
        value: account.id
    })); 



    const isPending = 
        editMutation.isPending   || 
        deleteMutation.isPending ||
        transactionQuery.isLoading ||
        categoryMutation.isPending ||
        accountMutation.isPending; 
    
    const isLoading = 
        transactionQuery.isLoading ||
        categoryQuery.isLoading ||
        accountsQuery.isLoading;  
    
    const onSubmit = ( values : FormValues )=>{
        editMutation.mutate( values,{
            onSuccess: ()=>{
                onClose(); 
            }
        })
    }; 

    const onDelete = async ()=>{

        const ok = await confirm(); 

        if(ok){
            deleteMutation.mutate(undefined, {
                onSuccess: ()=>{
                    onClose(); 
                }
            })
        }

    }

    const defaultValues = transactionQuery.data ? {
        accountId:  transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount:     transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date 
            ? new Date(transactionQuery.data.date)
            : new Date(),
        payee: transactionQuery.data.payee,
        note:  transactionQuery.data.notes
    } : {
        accountId  : "",
        categoryId : "",
        amount : "",
        date   : new Date(),
        payee  : "",
        note   : "",
    }


    return(
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose} >
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Edit transaction
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing transaction
                        </SheetDescription>
                    </SheetHeader>

                    { isLoading 
                        ?(
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2  className="size-4 text-muted-foreground animate-spin"/>
                            </div>
                        ) : (
                            <TransactionForm 
                                id={id}
                                defaultValues={defaultValues}
                                onSubmit={onSubmit}
                                onDelete={onDelete}
                                disabled={isPending}
                                categoryOptions={categoryOptions}
                                onCreateCategory={onCreateCategory}
                                accountOptions ={accountOptions}
                                onCreateAccount={onCreateAccount}
                            />

                        )

                        
                    }

                </SheetContent>
            </Sheet>
        </>
        
    );
}; 

