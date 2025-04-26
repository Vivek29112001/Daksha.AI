import { getIndustryInsights } from "@/actions/dashboard";
import { redirect } from "next/navigation";
import { getUserOnBoardingStatus } from "@/actions/user"; // updated name
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage = async () => {
    const { isOnboarded } = await getUserOnBoardingStatus();
    const insights = await getIndustryInsights();

    if (!isOnboarded) {
        redirect("/onboarding");
    }
    
    return (
        <div className="container">
            <DashboardView insights={insights} />
        </div>
    );
};

export default IndustryInsightsPage;
