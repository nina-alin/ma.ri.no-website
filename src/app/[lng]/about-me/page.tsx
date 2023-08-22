import { LocomotiveScrollAppProvider } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";

interface Props {
  params: {
    lng: string;
  };
}
const AboutMe = async ({ params: { lng } }: Props) => {
  return (
    <LocomotiveScrollAppProvider>
      <div data-scroll-section>
        <h1>About me</h1>
      </div>
    </LocomotiveScrollAppProvider>
  );
};

export default AboutMe;
