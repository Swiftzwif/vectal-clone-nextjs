import AudioControl from "@/components/global/audio-control";
import ChatUI from "@/components/global/chat-interface";
import { PageWrapper } from "@/components/global/page-wrapper";
import MobileNavigation from "@/components/global/mobile-navigation"

export default function Home() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex lg:flex-row h-screen bg-[#151515]">
        <ChatUI />
        <PageWrapper>
          <AudioControl />
        </PageWrapper>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col h-screen bg-[#151515]">
        <MobileNavigation />
      </div>
    </>
  );
}
