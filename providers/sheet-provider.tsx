"use client"; 

import { EditAccountSheet }  from '@/features/accounts/components/edit-account-sheet';
import { NewAccountSheet }   from '@/features/accounts/components/new-accounts-sheet';
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet';
import { NewCategorySheet }  from '@/features/categories/components/new-categories-sheet';
import { EditTransactionSheet } from '@/features/transactions/components/edit-transactions-sheet';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet';
import { useMountedState  }  from 'react-use';


export const SheetProvider = ()=>{
    
    const isMounted = useMountedState(); 

    if( !isMounted ) return null; 
    
    return (
        <>
            <NewAccountSheet/>
            <EditAccountSheet />
        
            <NewCategorySheet/>
            <EditCategorySheet />

            <NewTransactionSheet />
            <EditTransactionSheet />
        </> 
    )
}