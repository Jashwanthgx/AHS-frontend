import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-gutter font-body-md text-on-background relative overflow-hidden">
      {/* Subtle Background Elements for Splash Screen Feel */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-surface-container-high to-background opacity-50 z-0 pointer-events-none"></div>
      
      {/* Main Content Container */}
      <main className="max-w-[48rem] w-full relative z-10 flex flex-col items-center text-center">
        {/* AI Flourish & Success Icon */}
        <div className="relative mb-lg">
          {/* Outer Glow / Halo */}
          <div className="absolute inset-0 bg-secondary-fixed rounded-full blur-2xl opacity-60 scale-150 animate-pulse" style={{ animationDuration: "3s" }}></div>
          
          {/* Icon Container */}
          <div className="w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center relative z-10 border border-surface-variant shadow-md">
            <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          </div>
          
          {/* Small Sparkle Detail */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center z-20 shadow-sm border border-surface-variant">
            <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
          </div>
        </div>

        {/* Typography */}
        <h1 className="font-display-lg text-display-lg text-on-background mb-sm">Application Received</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[36rem] mx-auto mb-xl">
          Thank you for applying. Our recruitment team has successfully recorded your details and is currently reviewing your profile against the role requirements.
        </p>

        {/* Next Steps Bento Grid */}
        <div className="w-full text-left bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm mb-xl">
          <h2 className="font-title-lg text-title-lg text-on-background mb-md">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Step 1 */}
            <div className="flex flex-col gap-sm p-md bg-surface rounded-lg border border-surface-variant">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center mb-xs">
                <span className="material-symbols-outlined text-on-secondary-fixed-variant">troubleshoot</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background text-lg">AI Pre-Screen</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">Our system highlights your key strengths and skills alignment for the hiring team.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col gap-sm p-md bg-surface rounded-lg border border-surface-variant relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 -left-4 w-4 border-t-2 border-dashed border-outline-variant"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mb-xs">
                <span className="material-symbols-outlined text-primary">groups</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background text-lg">Team Review</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">The hiring manager reviews your augmented profile and full application details.</p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col gap-sm p-md bg-surface rounded-lg border border-surface-variant relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 -left-4 w-4 border-t-2 border-dashed border-outline-variant"></div>
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mb-xs">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background text-lg">Status Update</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">You will receive an email regarding the next steps within 2-3 business days.</p>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <Link href="/" className="inline-flex items-center justify-center gap-sm bg-primary text-on-primary font-label-md text-label-md px-xl py-md rounded-lg hover:bg-primary-fixed-variant hover:text-on-primary-fixed-variant transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Jobs
        </Link>
      </main>
    </div>
  );
}
