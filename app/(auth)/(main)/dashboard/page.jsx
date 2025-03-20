import { redirect } from "next/navigation";
import { getUserOnBoardingStatus } from "@/actions/user";

const IndustryInsightsPage = async () => {
    const { isOnboarded } = await getUserOnBoardingStatus();

    if (!isOnboarded) {
        redirect("/onboarding")
    }
    return (
        <div>
            IndustryInsightsPage
        </div>
    )
}

export default IndustryInsightsPage
