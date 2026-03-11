import {
  Hero,
  HowItWorks,
  Features,
  Pricing,
  SocialProof,
  WaitlistSection,
} from "@/components/landing";

export default function MarketingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <SocialProof />
      <WaitlistSection />
    </main>
  );
}
