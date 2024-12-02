'use client'

import { useState, useRef } from 'react'
import { QrReader } from 'react-qr-reader'
import { CheckCircle2 } from "lucide-react"
import { sendBarcodeToBackend } from '../../utils/scanner'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

interface UserDetails {
    _id: string
    name: string
    email: string
    valid: boolean
    gitamite: boolean
    phoneNumber: string
}

const Scan = () => {
    const [result, setResult] = useState<UserDetails | null>(null)
    const [scanning, setScanning] = useState(true)
    const scanningRef = useRef(scanning)

    const handleScan = async (data: string | null) => {
        if (data && scanningRef.current) {
            scanningRef.current = false;
            const response = await sendBarcodeToBackend(data, setScanning)
            if (response.output_status === "SUCCESS") {
                setResult({ ...response.output_details, valid: true })
            } else {
                setResult({ ...response.output_details, valid: false })
            }
            scanningRef.current = true;
        }
    }

    const handleError = (err: Error) => {
        console.error(err)
    }

    return (
        <div className="container mx-auto my-auto p-4">
            <Card className="max-w-md mx-auto rounded-3xl border border-lightBlack">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Scan Prerana Pass</CardTitle>
                </CardHeader>
                <CardContent>
                    {scanning ?
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <QrReader
                                onResult={(result, error) => {
                                    if (result) {
                                        handleScan(result.getText())
                                    }
                                    if (error) {
                                        handleError(error)
                                    }
                                }}
                                constraints={{ facingMode: 'environment' }}
                                className="w-full h-full"
                            />
                        </div>
                        :
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2"></div>
                        </div>
                    }
                    {result?.valid === true ?
                        <>
                            <div className="flex items-center space-x-2 text-2xl justify-center w-full text-green-600 p-5">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Fest Pass Validated!</span>
                            </div>
                            <div className="mt-2 text-xl flex flex-col space-y-2 w-full">
                                {Object.entries(result).map(([key, value]) => (
                                    ["_id", "valid"].includes(key) ? null :
                                        <p key={key} className='w-full flex items-center justify-between'>
                                            <span className='font-bold'>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                                            <span className='text-right text-wrap'>{typeof value === 'boolean' ? (value ? "Yes" : "No") : value}</span>
                                        </p>
                                ))}
                            </div>
                        </> :
                        result?.valid === false &&
                        <div className="flex items-center space-x-2 text-2xl justify-center w-full text-red-600 p-5">
                            <CrossCircledIcon className="w-5 h-5" />
                            <span>Fest Pass Invalid!</span>
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
};

export default Scan;