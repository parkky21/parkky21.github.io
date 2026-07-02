import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { PrintButton } from "@/components/resume/PrintButton";
import { ResumeSheet } from "@/components/resume/ResumeSheet";
import { Annotation } from "@/components/scrapbook/Annotation";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}'s resume — ${profile.title}.`,
};

export default function ResumePage() {
  return (
    <main className="relative mx-auto max-w-4xl px-5 py-14">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <Annotation tone="soft" className="text-2xl">
          the official page of the scrapbook ↓
        </Annotation>
        <PrintButton />
      </div>

      <ResumeSheet />
    </main>
  );
}
