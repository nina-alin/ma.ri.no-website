import { LocomotiveScrollAppProvider } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";

interface AboutMeProperties {
  params: {
    lng: string;
  };
}

const AboutMe = async ({ params: { lng } }: AboutMeProperties) => {
  return (
    <div>
      <h1>About me</h1>
    </div>
  );
};

export default AboutMe;
