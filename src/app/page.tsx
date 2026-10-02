import Banner from "../components/home/Banner";
import BecomeDonor from "../components/home/BecomeDonor";
import BloodGroups from "../components/home/BloodGroups";
import EmergencyRequests from "../components/home/EmergencyRequests";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseUs from "../components/home/WhyChooseUs";



export default function HomePage() {
  return (
    <main>
      <Banner/>
      <EmergencyRequests/>
      <HowItWorks/>
      <BloodGroups/>
      <WhyChooseUs/>
      <BecomeDonor/>
    </main>
  );
}
