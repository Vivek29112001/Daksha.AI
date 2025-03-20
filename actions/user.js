"use server";
import { db } from "@/lib/prisma";
import { industries } from "@/data/industries";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })
    if (!userId) throw new Error("User not found");

    try {
        const result = await db.$transaction(async (tx) => {
            //find if the industry exists
            let industryInsight = await tx.industryInsight.findUnique({
                where: {
                    industry: data.industry,
                }
            })

            // if the industry does't exist , creat it with default value - will replace it will ai later
            if (!industryInsight) {
                industryInsight = await tx.industryInsight.create({
                    data: {
                        industry: data.industry,
                        salaryRange: [],
                        growthRate: 0,
                        demandLevel: "Medium",
                        topSkills: [],
                        marketOutLook: "Neutral",
                        keyTrends: [],
                        recommendedSkills: [],
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                })
            }


            //update the user
            const updatedUser = await tx.user.Update({
                where: {
                    id: user.id,
                },
                data: {
                    industry: data.industry,
                    experience: data.experience,
                    bio: data.bio,
                    skills: data.skills,
                }
            });
            return { updatedUser, industryInsight };
        }, {
            timeout: 10000, //default 5000
        })
        return result.user;
    } catch (error) {
        console.log("Error updating user and industry: ", error.message);
        throw new Error("Failed to update profile");
    }
}


export async function getUserOnBoardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })
    if (!userId) throw new Error("User not found");

    try{
        const user = await db.user.findUnique({
            where:{
                clerkUserId: userId,
            },
            select:{
                industry: true,
            }
        });
        return {
            isOnboarded : !!user?.industry
        }
    }catch(error){
        console.error("Error checking onboarding status:", error.message);
        throw new Error("Failed to check onBoarding status");
    }
} 
