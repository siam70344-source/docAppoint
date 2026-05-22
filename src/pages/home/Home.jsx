import { Helmet } from "react-helmet-async";
import HeroBanner from "../../components/home/HeroBanner";
import TopDoctors from "../../components/home/TopDoctors";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Stats from "../../components/home/Stats";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DocAppoint — Book Doctor Appointments in Bangladesh</title>
        <meta
          name="description"
          content="DocAppoint is Bangladesh's trusted doctor appointment booking platform. Find top-rated doctors, book appointments instantly, and manage your health journey."
        />
      </Helmet>

      <HeroBanner />
      <TopDoctors />
      <WhyChooseUs />
      <Stats />
    </>
  );
};

export default Home;