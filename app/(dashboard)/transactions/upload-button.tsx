import { Upload } from "lucide-react";
import { useCSVReader } from 'react-papaparse';

import { Button } from "@/components/ui/button";

type Props = {
    onUpload: (result: any )=> void; 
}


export const UploadButton = ({onUpload}: Props )=>{
    
    const { CSVReader } = useCSVReader(); 

    // TODO: add a paywall 


    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({getRootProps}:any)=>(
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                >
                    <Upload className="size-4"/>
                    Import
                </Button>
            )}
        </CSVReader>
    )


}