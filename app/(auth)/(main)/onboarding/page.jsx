import { industries } from "@/data/industries"
import OnboardingForm from "./_components/onboarding-form"
import { getUserOnBoardingStatus } from "@/actions/user"
import { redirect } from "next/navigation";

const  onboardingPage = async() => {
    // check if user is already onboarding
    const {isOnboarded} =await getUserOnBoardingStatus();

    if(isOnboarded){
        redirect("/dashboard")
    }
  return (
    <main>
      <OnboardingForm industries = {industries}/>
    </main>
  )
}

export default  onboardingPage
