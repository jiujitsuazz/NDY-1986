import { Hero } from "@/components/sections/Hero";
import { OrderStatusCard } from "./OrderStatusCard";
import { CommunitySection } from "./CommunitySection";
import { NextChapterSignup } from "./NextChapterSignup";
import { MissionSection } from "@/components/sections/MissionSection";
import { homepageContent } from "@/data/content/homepage";

/**
 * A known customer. No longer treated as an anonymous prospect: no
 * "you may also like" (there is only one product), no re-sell of The Core
 * as if it hasn't been bought. Order: relationship -> community -> retention.
 */
export function CustomerExperience() {
  return (
    <>
      <Hero {...homepageContent.customer} compact />
      <section id="your-orders" className="border-b border-ndy-charcoal py-16 sm:py-20">
        <div className="container-ndy">
          <OrderStatusCard />
        </div>
      </section>
      <CommunitySection />
      <MissionSection />
      <NextChapterSignup />
    </>
  );
}
