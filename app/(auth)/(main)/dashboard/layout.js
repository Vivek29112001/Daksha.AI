import React from 'react'
import { Suspense } from 'react'
import {BarLoader} from "react-spinners"

const LayoutPanelLeft= ({ children }) => {
    return (
        <div className='px-1 mt-10 justify-center'>
            <div className='flex items-center  mb-5'>
                <h1 className='text-6xl font-bold gradient-title'>Industry Insights</h1>
            </div>
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='gray'/>}>
                {children}
            </Suspense>
        </div>
    )
}

export default LayoutPanelLeft
