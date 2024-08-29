import { useState } from 'react';


import { 
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem
} from "@/components/ui/select";


import {
    Card, 
    CardContent, 
    CardHeader,
    CardTitle 
} from '@/components/ui/card';
import { AreaChart, BarChart3, FileSearch, LineChart, Loader2 } from 'lucide-react';
import { AreaVariant } from './area-variant';
import { BarVariant } from './bar-variant';
import { LineVariant } from './line-variant';
import { Skeleton } from './ui/skeleton';

type Props = {
    data?: {
        date: string; 
        income: number; 
        expenses: number
    }[]; 
}


export const Chart = ({ data = []}:Props) =>{

    const [chartType, setChartType] = useState("area")

    const onTypeChange = ( type:string )=>{


        setChartType(type);
    }

    return (

        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <CardTitle className='text-xl line-clamp-1'>
                    Transactions
                </CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="area">
                            <div className="flex items-center">
                                <AreaChart className='size-4 mr-2 shrink-0' />
                                <p className="line-clamp-1">
                                    Area Chat
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className="flex items-center">
                                <LineChart className='size-4 mr-2 shrink-0' />
                                <p className="line-clamp-1">
                                    Line Chat
                                </p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center">
                                <BarChart3 className='size-4 mr-2 shrink-0' />
                                <p className="line-clamp-1">
                                    Bar Chat
                                </p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                { data.length === 0 ? (
                        <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                            <FileSearch className='size-6 text-muted-foreground'/>
                            <p className='text-muted-foreground text-sm'>No data for this period</p>
                        </div>
                    ) : (
                        <>
                            { chartType === "area" && <AreaVariant data={data}/>}
                            { chartType === "bar" && <BarVariant data={data}/>} 
                            { chartType === "line" && <LineVariant data={data}/>}
                        </>
                    )
                }
            </CardContent>
        
        </Card>


    )

}



export const ChartLoading = ()=>{


    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                    <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )

}

