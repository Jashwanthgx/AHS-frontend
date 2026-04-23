import Link from "next/link";

export default function FlowPage() {
  return (
    <>
      <header className="bg-white dark:bg-slate-900 font-inter text-sm antialiased border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <Link className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 active:scale-95 duration-150 ease-in-out" href="/">TalentBridge</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col w-full max-w-[1200px] mx-auto px-6 py-12 gap-12">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-background">Job Application Flow</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
            Follow this flow to apply for a job and schedule an interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-title-lg text-title-lg text-primary mb-4">Step 1: Apply</h2>
            <p className="text-on-surface-variant mb-6">Fill out your personal information and upload your resume.</p>
            <Link href="/apply" className="bg-primary text-on-primary px-6 py-3 rounded-lg hover:bg-on-primary-fixed-variant transition-colors inline-block">
              Start Application
            </Link>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-title-lg text-title-lg text-primary mb-4">Step 2: Schedule</h2>
            <p className="text-on-surface-variant mb-6">Choose a time for your initial AI or recruiter screening.</p>
            <Link href="/schedule" className="bg-surface-container border border-outline-variant text-on-surface px-6 py-3 rounded-lg hover:bg-surface-container-high transition-colors inline-block">
              View Schedule Options
            </Link>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-title-lg text-title-lg text-primary mb-4">Step 3: Success</h2>
            <p className="text-on-surface-variant mb-6">Your application is submitted and you're ready to go.</p>
            <Link href="/success" className="bg-surface-container border border-outline-variant text-on-surface px-6 py-3 rounded-lg hover:bg-surface-container-high transition-colors inline-block">
              View Success Screen
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
