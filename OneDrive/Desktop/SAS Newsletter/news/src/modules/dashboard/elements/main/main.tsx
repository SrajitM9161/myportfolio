"use client"

import DashboardOverViewCard from '@/app/Common/DashBoardOverviewCard'
import SubscribersChart from '@/Charts/Chart'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Main = () => {
    const { user } = useUser()
    return (
        <div className='p-5 w-full min-h-screen bg-gray-900'>
            <div className="text-2xl text-white font-medium">
                🌟 Hiiii... <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#654ea3] to-[#eaafc8]">{user?.fullName}</span> 🌟
            </div>
            <p className="text-sm text-white mt-4">
                📬 Welcome to our newswave! Stay tuned for the latest updates, tips, and exclusive content right here. 🌐 Sign up and never miss a thing! 🚀
            </p>

            <div className='w-full flex mt-5'>
                <div className='w-[65%]  min-h-[88vh] pr-5'>
                    <DashboardOverViewCard/>
                    <SubscribersChart/>
                </div>
            </div>
        </div>
    )
}

export default Main
