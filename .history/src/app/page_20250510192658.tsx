import { Suspense, lazy } from 'react';
import { PageWrapper } from "@/components/global/page-wrapper";
import MobileNavigation from "@/components/global/mobile-navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy load heavy components
const ChatUI = lazy(() => import("@/components/global/chat-interface"));
const AudioControl = lazy(() => import("@/components/global/audio-control"));

export default function Home() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex lg:flex-row h-screen bg-[#151515]">
        <Suspense fallback={<LoadingSpinner />}>
          <ChatUI />
        </Suspense>
        <PageWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <AudioControl />
          </Suspense>
        </PageWrapper>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col h-screen bg-[#151515]">
        <MobileNavigation />
      </div>
    </>
  );
}
