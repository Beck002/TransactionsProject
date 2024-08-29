import { CustomTooltip } from "./custom-tooltip";
import { format } from "date-fns";
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";

type Props = {
    data: {
        date: string,
        income: number, 
        expenses: number
    }[]; 
}


export const BarVariant = ({data}:Props)=>{


    return (

        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
               <CartesianGrid strokeDasharray="3 3"/> 
                <XAxis 
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value)=> format(value, "dd MM")}
                    style={{ fontSize: "12px"}}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip/>}/>
                <Bar
                    dataKey="income"
                    fill="#3dB2F6"
                    className="drop-shadow-sm"
                />
                <Bar
                    dataKey="expenses"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />

            </BarChart>
        </ResponsiveContainer>

    )


}