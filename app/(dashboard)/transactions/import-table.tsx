import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow
} from "@/components/ui/table"
import { TableHeadSelect } from "./table-head-select";

type Props = {
    headers: string[]; 
    body: string[][]; 
    selectedColumns: Record<string, string | null>;
    onTableHeadSelected: (columIndex: number, value:string | null)=>void; 
}

export const ImportTable = ({
  headers,
  body,
  selectedColumns,
  onTableHeadSelected,
}:Props) => {



  return (
   
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            { 
              headers.map((_item, index)=>(
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelected}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
            
          {body.map(( row:string[], index)=>(
            <TableRow key={index}>
              { row.map((cell, index)=>(
                <TableCell key={index}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
  
  )
}
