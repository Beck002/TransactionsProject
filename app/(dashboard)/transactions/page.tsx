'use client'; 

import React, { useState } from 'react'

import { transactions as transactionsSchema} from "@/db/schema"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';


enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT"
}

const  INITIAL_IMPORT_RESULTS = {
   data: [],
   errors: [],
   meta: {}
}

const TransactionsPage = () => {

  const [AccountDialog, confirm] = useSelectAccount(); 
  const [variant, SetVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResult, setImportResults] = useState(INITIAL_IMPORT_RESULTS); 

  const onUpload = ( results: typeof INITIAL_IMPORT_RESULTS)=>{
    console.log({results})
    setImportResults(results); 
    SetVariant(VARIANTS.IMPORT); 
  }

  const onCancelImport = ()=>{
    setImportResults(INITIAL_IMPORT_RESULTS); 
    SetVariant(VARIANTS.LIST); 
  }

  const newTransaction     = useNewTransaction();
  const createTansactions  = useBulkCreateTransactions();     
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery  = useGetTransactions(); 
  const transactions       = transactionsQuery.data || []; 
  
  const isDisabled = 
    transactionsQuery.isLoading ||
    deleteTransactions.isPending; 

  const onSubmitImport =  async (
    values: typeof transactionsSchema.$inferInsert[]
  )=>{
    const accountId = await confirm();

    if(!accountId){
      return toast.error("Please select an account to continue.")
    }

    const data = values.map((value)=>({
      ...value,
      accountId: accountId as string
    }));

    createTansactions.mutate(data, {
      onSuccess:()=>{
        onCancelImport();
      }
    })
  }

  if ( transactionsQuery.isLoading ) {
    
    return (
      
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-32 '>
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton  className='h-8 w-48'/> 
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2  className="size-6 text-slate-300 animate-spin " />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if( variant === VARIANTS.IMPORT){
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResult.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    )
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-32 '>
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Transactions History
                </CardTitle>
                <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                  <Button 
                    size="sm" 
                    onClick={newTransaction.onOpen}
                    className="w-full lg:w-auto"  
                  >
                    <Plus className='size-4 mr-2' />
                    Add new
                  </Button>
                  <UploadButton onUpload={onUpload}/>
                </div>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={transactions}
                filterKey='payee'
                onDelete={( row )=>{
                  const ids = row.map((r)=> r.original.id);
                  deleteTransactions.mutate({ids})
                }}
                disabled={ isDisabled }
              />
            </CardContent>
        </Card>
    </div>
  )
}



export default TransactionsPage;

