import Link from "next/link";

export default function SchedulePage() {
  return (
    <>
      {/* Minimal Header for Magic Link Context */}
      <header className="py-lg px-xl flex justify-center lg:justify-start items-center border-b border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="text-primary font-headline-md text-headline-md tracking-tight flex items-center gap-sm">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
          HireAI
        </div>
      </header>

      {/* Main Scheduling Area */}
      <main className="flex-1 flex items-center justify-center p-md lg:p-xl w-full max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">
        <div className="w-full bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-outline-variant/40 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Pane: Context & Calendar */}
          <div className="lg:w-[55%] p-xl border-b lg:border-b-0 lg:border-r border-outline-variant/40 bg-surface-container-lowest flex flex-col">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Schedule Your Interview</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Select a date and time that works best for you to connect with the engineering team.</p>
            
            {/* Interview Details Card */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-md p-md bg-surface-container-low rounded-lg mb-xl border border-outline-variant/30">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">video_camera_front</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">Technical Assessment</h3>
                <div className="flex items-center gap-xs text-on-surface-variant font-body-md text-body-md mt-xs">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  45 Min Video Call
                  <span className="mx-xs">•</span>
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Sarah Jenkins (Lead Engineer)
                </div>
              </div>
            </div>
            
            {/* Calendar Component */}
            <div className="mt-auto">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-md px-sm">
                <h2 className="font-title-lg text-title-lg text-on-surface">October 2024</h2>
                <div className="flex gap-xs">
                  <button aria-label="Previous month" className="p-xs rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button aria-label="Next month" className="p-xs rounded-full hover:bg-surface-container transition-colors text-on-surface">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-xs mb-sm text-center font-label-sm text-label-sm text-outline">
                <div className="py-xs">SUN</div><div className="py-xs">MON</div><div className="py-xs">TUE</div><div className="py-xs">WED</div><div className="py-xs">THU</div><div className="py-xs">FRI</div><div className="py-xs">SAT</div>
              </div>
              {/* Dates Grid */}
              <div className="grid grid-cols-7 gap-y-sm gap-x-xs text-center font-body-md text-body-md">
                {/* Previous Month */}
                <div className="py-sm text-outline-variant cursor-not-allowed">29</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">30</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">1</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">2</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">3</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">4</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">5</div>
                {/* Current Month - Past Dates */}
                <div className="py-sm text-outline-variant cursor-not-allowed">6</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">7</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">8</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">9</div>
                {/* Available Dates */}
                <div className="py-sm relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-primary-container rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-10 h-10 mx-auto"></div>
                  <span className="relative text-primary font-label-md text-label-md">10</span>
                  <div className="w-1 h-1 bg-primary rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-sm relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-primary-container rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-10 h-10 mx-auto"></div>
                  <span className="relative text-primary font-label-md text-label-md">11</span>
                  <div className="w-1 h-1 bg-primary rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-sm text-on-surface cursor-not-allowed opacity-50">12</div>
                {/* Selected Date */}
                <div className="py-sm relative cursor-pointer flex justify-center items-center">
                  <div className="absolute inset-0 bg-primary rounded-full shadow-sm w-10 h-10 mx-auto"></div>
                  <span className="relative text-on-primary font-label-md text-label-md">13</span>
                </div>
                {/* More Available Dates */}
                <div className="py-sm relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-primary-container rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-10 h-10 mx-auto"></div>
                  <span className="relative text-primary font-label-md text-label-md">14</span>
                  <div className="w-1 h-1 bg-primary rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">15</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">16</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">17</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">18</div>
                <div className="py-sm text-on-surface cursor-not-allowed opacity-50">19</div>
                {/* Remaining Dates (Simplified) */}
                <div className="py-sm text-on-surface cursor-not-allowed opacity-50">20</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">21</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">22</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">23</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">24</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">25</div>
                <div className="py-sm text-on-surface cursor-not-allowed opacity-50">26</div>
                <div className="py-sm text-on-surface cursor-not-allowed opacity-50">27</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">28</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">29</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">30</div>
                <div className="py-sm text-on-surface hover:bg-surface-container rounded-full w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-colors">31</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">1</div>
                <div className="py-sm text-outline-variant cursor-not-allowed">2</div>
              </div>
            </div>
            
            {/* AI Highlight Layer */}
            <div className="mt-xl flex items-start gap-sm p-sm rounded-lg bg-surface-container-low border border-secondary/20 shadow-[0_0_15px_rgba(113,42,226,0.05)]">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              <p className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
                Dates with dots indicate high availability based on your recruiter's schedule.
              </p>
            </div>
          </div>

          {/* Right Pane: Time Slots */}
          <div className="lg:w-[45%] p-xl bg-surface flex flex-col relative">
            <div className="mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">Sunday, October 13</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">language</span>
                Pacific Daylight Time (PDT)
              </p>
            </div>
            {/* Slots Grid */}
            <div className="flex-1 overflow-y-auto pr-sm mb-xl flex flex-col gap-sm custom-scrollbar">
              <button className="w-full text-left p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all group flex justify-between items-center bg-surface-container-lowest">
                <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">09:00 AM</span>
                <span className="opacity-0 group-hover:opacity-100 font-label-sm text-label-sm text-primary transition-opacity border border-primary px-sm py-xs rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all group flex justify-between items-center bg-surface-container-lowest">
                <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">09:45 AM</span>
                <span className="opacity-0 group-hover:opacity-100 font-label-sm text-label-sm text-primary transition-opacity border border-primary px-sm py-xs rounded-full">Select</span>
              </button>
              {/* Selected State */}
              <button className="w-full text-left p-md rounded-lg border-2 border-primary bg-primary-container/5 flex justify-between items-center shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <span className="font-title-lg text-title-lg text-primary">10:30 AM</span>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </button>
              <button className="w-full text-left p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all group flex justify-between items-center bg-surface-container-lowest">
                <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">01:00 PM</span>
                <span className="opacity-0 group-hover:opacity-100 font-label-sm text-label-sm text-primary transition-opacity border border-primary px-sm py-xs rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all group flex justify-between items-center bg-surface-container-lowest">
                <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">02:30 PM</span>
                <span className="opacity-0 group-hover:opacity-100 font-label-sm text-label-sm text-primary transition-opacity border border-primary px-sm py-xs rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-md rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all group flex justify-between items-center bg-surface-container-lowest">
                <span className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors">04:00 PM</span>
                <span className="opacity-0 group-hover:opacity-100 font-label-sm text-label-sm text-primary transition-opacity border border-primary px-sm py-xs rounded-full">Select</span>
              </button>
            </div>
            {/* Action Area (Sticky Bottom) */}
            <div className="pt-md border-t border-outline-variant/30 bg-surface mt-auto">
              <Link href="/success" className="w-full bg-primary text-on-primary py-md rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm flex items-center justify-center gap-sm">
                Confirm 10:30 AM
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        /* Custom subtle scrollbar for the time slots */
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #c3c6d7; /* outline-variant */
            border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #737686; /* outline */
        }
      `}} />
    </>
  );
}
