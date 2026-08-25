import { prisma } from "@near/cms-core/lib/prisma";
import BannerHost from "@near/cms-core/components/site/BannerHost";
import LenisProvider from "@/components/site/providers/LenisProvider";
import AnalyticsScripts from "@/components/site/AnalyticsScripts";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingHeaderReveal from "@/components/site/FloatingHeaderReveal";

export const revalidate = 60;

async function getActiveBanners() {
  const now = new Date();
  try {
    return await prisma.banner.findMany({
      where: {
        enabled: true,
        AND: [
          { OR: [{ startDate: null }, { startDate: { lte: now } }] },
          { OR: [{ endDate: null }, { endDate: { gte: now } }] },
        ],
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        type: true,
        paths: true,
        frequency: true,
        contentMode: true,
        content: true,
        htmlContent: true,
        modalDelaySeconds: true,
        modalScrollPercent: true,
        modalPosition: true,
        displayMode: true,
      },
    });
  } catch (error) {
    // Never let a DB hiccup (e.g. unreachable during static build) break page rendering.
    console.error("Failed to fetch active banners:", error);
    return [];
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const banners = await getActiveBanners();

  return (
    <LenisProvider>
      <AnalyticsScripts />
      <FloatingHeaderReveal />
      <BannerHost banners={banners as any} slot="top" />
      {children}
      <SiteFooter />
      <BannerHost banners={banners as any} slot="bottom" />
    </LenisProvider>
  );
}
