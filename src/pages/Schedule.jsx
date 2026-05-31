import React from "react";
import { Link } from "react-router-dom";

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-inter text-slate-900">
      {/* Main Scheduling Area */}
      <main className="flex-1 flex items-center justify-center p-6 w-full max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">
        <div className="w-full bg-white rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Pane: Context & Calendar */}
          <div className="lg:w-[55%] p-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white flex flex-col">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Schedule Your Interview</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">Select a date and time that works best for you to connect with the engineering team.</p>
            
            {/* Interview Details Card */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">video_camera_front</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Technical Assessment</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 font-medium">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  45 Min Video Call
                  <span className="mx-1">•</span>
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Sarah Jenkins (Lead Engineer)
                </div>
              </div>
            </div>
            
            {/* Calendar Component */}
            <div className="mt-auto">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-lg font-bold text-slate-900">October 2024</h2>
                <div className="flex gap-1">
                  <button aria-label="Previous month" className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 cursor-pointer">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button aria-label="Next month" className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-700 cursor-pointer">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-3 text-center text-xs font-bold text-slate-400 tracking-wider">
                <div className="py-1">SUN</div><div className="py-1">MON</div><div className="py-1">TUE</div><div className="py-1">WED</div><div className="py-1">THU</div><div className="py-1">FRI</div><div className="py-1">SAT</div>
              </div>
              {/* Dates Grid */}
              <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-sm font-medium text-slate-700">
                {/* Previous Month */}
                <div className="py-2 text-slate-300 cursor-not-allowed">29</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">30</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">1</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">2</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">3</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">4</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">5</div>
                {/* Current Month - Past Dates */}
                <div className="py-2 text-slate-300 cursor-not-allowed">6</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">7</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">8</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">9</div>
                {/* Available Dates */}
                <div className="py-2 relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-blue-50 rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-9 h-9 mx-auto"></div>
                  <span className="relative text-blue-600 font-bold">10</span>
                  <div className="w-1 h-1 bg-blue-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-2 relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-blue-50 rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-9 h-9 mx-auto"></div>
                  <span className="relative text-blue-600 font-bold">11</span>
                  <div className="w-1 h-1 bg-blue-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-2 text-slate-400 cursor-not-allowed opacity-50">12</div>
                {/* Selected Date */}
                <div className="py-2 relative cursor-pointer flex justify-center items-center">
                  <div className="absolute inset-0 bg-blue-600 rounded-full shadow-sm w-9 h-9 mx-auto"></div>
                  <span className="relative text-white font-bold">13</span>
                </div>
                {/* More Available Dates */}
                <div className="py-2 relative cursor-pointer group flex justify-center items-center">
                  <div className="absolute inset-0 bg-blue-50 rounded-full opacity-10 group-hover:opacity-30 transition-opacity w-9 h-9 mx-auto"></div>
                  <span className="relative text-blue-600 font-bold">14</span>
                  <div className="w-1 h-1 bg-blue-600 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">15</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">16</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">17</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">18</div>
                <div className="py-2 text-slate-400 cursor-not-allowed opacity-50">19</div>
                {/* Remaining Dates (Simplified) */}
                <div className="py-2 text-slate-400 cursor-not-allowed opacity-50">20</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">21</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">22</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">23</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">24</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">25</div>
                <div className="py-2 text-slate-400 cursor-not-allowed opacity-50">26</div>
                <div className="py-2 text-slate-400 cursor-not-allowed opacity-50">27</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">28</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">29</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">30</div>
                <div className="py-2 text-slate-700 hover:bg-slate-100 rounded-full w-9 h-9 mx-auto flex items-center justify-center cursor-pointer transition-colors">31</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">1</div>
                <div className="py-2 text-slate-300 cursor-not-allowed">2</div>
              </div>
            </div>
            
            {/* AI Highlight Layer */}
            <div className="mt-8 flex items-start gap-2 p-4 rounded-xl bg-slate-50 border border-blue-100 shadow-[0_0_15px_rgba(37,99,235,0.02)]">
              <span className="material-symbols-outlined text-blue-600">auto_awesome</span>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Dates with dots indicate high availability based on your recruiter's schedule.
              </p>
            </div>
          </div>

          {/* Right Pane: Time Slots */}
          <div className="lg:w-[45%] p-8 bg-white flex flex-col relative border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Sunday, October 13</h2>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px]">language</span>
                Pacific Daylight Time (PDT)
              </p>
            </div>
            {/* Slots Grid */}
            <div className="flex-1 overflow-y-auto pr-2 mb-6 flex flex-col gap-2 custom-scrollbar">
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50 transition-all group flex justify-between items-center bg-white cursor-pointer">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">09:00 AM</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50 transition-all group flex justify-between items-center bg-white cursor-pointer">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">09:45 AM</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-full">Select</span>
              </button>
              {/* Selected State */}
              <button className="w-full text-left p-4 rounded-xl border-2 border-blue-600 bg-blue-50/20 flex justify-between items-center shadow-sm relative overflow-hidden cursor-pointer">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                <span className="font-bold text-blue-600">10:30 AM</span>
                <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50 transition-all group flex justify-between items-center bg-white cursor-pointer">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">01:00 PM</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50 transition-all group flex justify-between items-center bg-white cursor-pointer">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">02:30 PM</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-full">Select</span>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50 transition-all group flex justify-between items-center bg-white cursor-pointer">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">04:00 PM</span>
                <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 font-bold border border-blue-600 px-3 py-1 rounded-full">Select</span>
              </button>
            </div>
            {/* Action Area (Sticky Bottom) */}
            <div className="pt-4 border-t border-slate-100 bg-white mt-auto">
              <Link to="/success" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer">
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
            background-color: #e2e8f0; 
            border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background-color: #cbd5e1; 
        }
      `}} />
    </div>
  );
}
