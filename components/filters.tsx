import { AccountFilters } from "./account-filters"
import { DateFilters } from "./date-filters"



export const Filters  = ()=>{


    return (
        <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-x-2">
            <AccountFilters />
            <DateFilters />
        </div>
    )



}



