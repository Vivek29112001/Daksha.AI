"use client"
import { LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const dashboardView = ({ insights }) => {
    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.mix / 1000,
        median: range.median / 1000
    }))

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "text-green-500"
            case "medium":
                return "text-yellow-500"
            case "low":
                return "text-red-500"
            default:
                return "text-gray-500"
        }
    };

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    }

    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const OutlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

    const lastUpdatedDate = format(new Date(insights.nextUpdate), "dd/MM/yyyy")
    const nextUpdateDistance = formatDistanceToNow(
        new Date(insights.nextUpdate),
        { addSuffix: true }
    );


    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <Badge varient="outline">Last updated: {lastUpdatedDate}</Badge>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
                        <OutlookIcon className={`h-4 w-4 ${OutlookColor}`}/>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{insights.marketOutlook}</div>
                        <p className='text-xs text-muted-foreground'>
                            Next update {nextUpdateDistance}
                        </p>
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default dashboardView
