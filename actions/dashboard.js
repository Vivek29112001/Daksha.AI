"use server"
import { db } from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

new GoogleGenerativeAI(process.env.EMINI_API_KEY)

export const generateAIInsights = async(industry)=>{

}


export async function getIndustryInsights(){
    const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            }
        })
        if (!userId) throw new Error("User not found");

         // if the industry does't exist , creat it with default value - will replace it will ai later
         if (!user.industryInsight) {
            const insights = await generateAIInsights(user.industry);
            const industryInsight = await db.industryInsight.create({
                data: {
                    industry: user.industry,
                  ...insights,
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
            })
            return industryInsight;
        }
        return user.industryInsight;
}