'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, Check, X, Flag, Clock, FileText, Download, Filter } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function RepoVulnerabilitiesView() {
  const [activeTab, setActiveTab] = useState('Findings');
  const [activeFilter, setActiveFilter] = useState('All findings');

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-zinc-900 overflow-x-hidden">
      
      {/* 1. TOP METRICS HEADER */}
      <div className="px-6 py-6 border-b border-zinc-200/80">
        <h1 className="text-[22px] font-bold tracking-tight mb-6">Vulnerability overview</h1>
        
        <div className="flex items-center gap-12">
          {/* Circular Progress Metric */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">SECURE FINDINGS</span>
            <div className="flex items-center gap-2.5">
               <div className="relative w-5 h-5">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e4e4e7" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="73, 100" />
                  </svg>
               </div>
               <div className="flex items-baseline gap-1">
                 <span className="text-[15px] font-bold text-zinc-900">73%</span>
                 <span className="text-[14px] text-zinc-500">- 65/89</span>
               </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">UNASSIGNED</span>
            <div className="text-[14px] font-bold text-zinc-900">8 findings</div>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">REQUIREMENTS MET</span>
            <div className="text-[14px] font-bold text-zinc-900">16<span className="text-zinc-500 font-normal">/33</span></div>
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="flex items-center gap-6 mt-8">
          {['Overview', 'Findings', 'Requirements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-[14px] font-medium tracking-tight transition-colors ${activeTab === tab ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-800'}`}
            >
              {activeTab === tab && <div className="absolute left-[-2px] right-[-2px] bottom-[-1px] h-[2px] bg-indigo-600 rounded-t-sm" />}
              {tab === 'Findings' && activeTab === tab && <div className="absolute left-[-16px] top-[4px] w-2.5 h-2.5 border-2 border-indigo-600 rounded-full" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. FILTER & ACTION BAR */}
      <div className="px-6 py-4 flex flex-col gap-4">
        
        {/* Top filter pills (Full width segmented control) */}
        <div className="flex items-center justify-between w-full border border-zinc-200/80 rounded-[8px] p-1 bg-zinc-50/50">
           <button onClick={() => setActiveFilter('All findings')} className={`flex-1 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'All findings' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}>All findings</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('Critical')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'Critical' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><X className="w-3.5 h-3.5 text-red-500" /> Critical 3</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('High')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'High' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><Flag className="w-3.5 h-3.5 text-orange-500" /> High 2</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('In review')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'In review' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><Search className="w-3.5 h-3.5 text-indigo-500" /> In review 7</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('In progress')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'In progress' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><Clock className="w-3.5 h-3.5 text-orange-400" /> In progress 4</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('Pending')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'Pending' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><Clock className="w-3.5 h-3.5 text-zinc-400" /> Pending 8</button>
           <div className="w-px h-4 bg-zinc-200 mx-1"></div>
           <button onClick={() => setActiveFilter('Fixed')} className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-[6px] transition-colors ${activeFilter === 'Fixed' ? 'bg-white shadow-sm text-zinc-900 border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}><Check className="w-3.5 h-3.5 text-emerald-500" /> Fixed 65</button>
        </div>

        {/* Secondary Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex items-center border border-zinc-200 rounded-[6px] bg-white h-8 px-2 shadow-sm gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><span className="text-white text-[8px] font-bold">ISO</span></div>
                <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center"><span className="text-white text-[8px] font-bold">SOC</span></div>
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-1" />
             </div>
             
             <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
                <input type="text" placeholder="Search findings..." className="h-8 pl-8 pr-3 border border-zinc-200 rounded-[6px] text-[13px] w-[280px] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm placeholder:text-zinc-400" />
             </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="flex items-center border border-zinc-200 rounded-[6px] bg-white shadow-sm h-8 divide-x divide-zinc-200">
                <button className="px-3 h-full text-[13px] font-medium text-zinc-900 bg-zinc-50 rounded-l-[6px]">All</button>
                <button className="px-3 h-full text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Unassigned</button>
                <button className="px-3 h-full text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Assigned</button>
                <button className="px-3 h-full text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors flex items-center gap-1">Assigned to... <ChevronDown className="w-3 h-3 text-zinc-400" /></button>
             </div>
             
             <button className="flex items-center gap-1.5 border border-zinc-200 rounded-[6px] bg-white shadow-sm h-8 px-3 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                Requirements <ChevronDown className="w-3 h-3 text-zinc-400" />
             </button>
             
             <button className="flex items-center gap-1.5 border border-zinc-200 rounded-[6px] bg-white shadow-sm h-8 px-3 text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                <Download className="w-3.5 h-3.5 text-zinc-400" /> Export
             </button>
          </div>
        </div>
      </div>

      {/* 3. TABLE STRUCTURE */}
      <div className="w-full flex-1">
        
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-2 border-y border-zinc-200/80 bg-zinc-50/50">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">FINDING</div>
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">OWNER</div>
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">REMEDIATION</div>
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">STATUS</div>
        </div>

        {/* Group 1: Critical (Failing equivalent) */}
        <div>
           {/* Group Header */}
           <div className="flex items-center gap-2 px-6 py-2.5 bg-[#fef2f2] border-b border-zinc-200/80">
              <X className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
              <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Critical <span className="font-normal text-zinc-500 ml-1">4</span></span>
           </div>

           {/* Row 1 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">SQL Injection in user lookup</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <div className="relative w-3.5 h-3.5">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                         <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e4e4e7" strokeWidth="6" />
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="94, 100" />
                       </svg>
                    </div>
                    94% AI Confidence score
                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">API</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">TA</div>
                 <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Tanvir Ahassan</span>
              </div>

              <div className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-600">
                 <FileText className="w-3.5 h-3.5 text-zinc-400" /> 1 Patch generated
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef2f2] border border-red-200/80">
                    <X className="w-3 h-3 text-red-600 stroke-[3]" />
                    <span className="text-[12px] font-bold text-red-700 tracking-tight">Critical</span>
                 </div>
              </div>
           </div>

           {/* Row 2 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">Hardcoded API Secret in config</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <div className="relative w-3.5 h-3.5">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                         <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e4e4e7" strokeWidth="6" />
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="99, 100" />
                       </svg>
                    </div>
                    99% AI Confidence score
                    <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">ENV</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">TA</div>
                 <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Tanvir Ahassan</span>
              </div>

              <div className="flex flex-col gap-0.5">
                 <span className="text-[13px] text-zinc-500">Not provided yet</span>
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef2f2] border border-red-200/80">
                    <X className="w-3 h-3 text-red-600 stroke-[3]" />
                    <span className="text-[12px] font-bold text-red-700 tracking-tight">Critical</span>
                 </div>
              </div>
           </div>
        </div>


        {/* Group 2: High (Needs changes equivalent) */}
        <div>
           {/* Group Header */}
           <div className="flex items-center gap-2 px-6 py-2.5 bg-[#fff7ed] border-b border-zinc-200/80">
              <Flag className="w-3.5 h-3.5 text-orange-500 stroke-[2.5]" />
              <span className="text-[13px] font-bold text-zinc-900 tracking-tight">High <span className="font-normal text-zinc-500 ml-1">2</span></span>
           </div>

           {/* Row 3 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">Cross-Site Scripting (XSS) via bio</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <div className="relative w-3.5 h-3.5">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                         <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e4e4e7" strokeWidth="6" />
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="85, 100" />
                       </svg>
                    </div>
                    85% AI Confidence score
                    <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">XSS</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-1 text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5.5M8.5 15v-4M8.5 11v-2m0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm13 10v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Assign
                 </button>
              </div>

              <div className="flex flex-col gap-1 text-[13px] font-medium text-zinc-600">
                 <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-zinc-400" /> 1 PR created</div>
                 <div className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/></svg> 1 policy</div>
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff7ed] border border-orange-200/80">
                    <Flag className="w-3 h-3 text-orange-500 stroke-[2.5]" />
                    <span className="text-[12px] font-bold text-orange-700 tracking-tight">Needs changes</span>
                 </div>
              </div>
           </div>
           
           {/* Row 4 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">Weak JWT Validation</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <div className="relative w-3.5 h-3.5">
                       <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                         <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e4e4e7" strokeWidth="6" />
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="98, 100" />
                       </svg>
                    </div>
                    98% AI Confidence score
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">JWT</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">FS</div>
                 <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Felix Schmidt</span>
              </div>

              <div className="flex flex-col gap-1 text-[13px] font-medium text-zinc-600">
                 <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-zinc-400" /> 2 files patched</div>
                 <div className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/></svg> 1 policy</div>
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff7ed] border border-orange-200/80">
                    <Flag className="w-3 h-3 text-orange-500 stroke-[2.5]" />
                    <span className="text-[12px] font-bold text-orange-700 tracking-tight">Needs changes</span>
                 </div>
              </div>
           </div>
        </div>


        {/* Group 3: Fixed (Passing equivalent) */}
        <div>
           {/* Group Header */}
           <div className="flex items-center gap-2 px-6 py-2.5 bg-[#ecfdf5] border-b border-zinc-200/80">
              <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
              <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Fixed <span className="font-normal text-zinc-500 ml-1">67</span></span>
           </div>

           {/* Row 5 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">Missing Rate Limiting on Login</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    All 4 checks are passing
                    <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">SEC</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">IW</div>
                 <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Isabella Williams</span>
              </div>

              <div className="flex flex-col gap-1 text-[13px] font-medium text-zinc-600">
                 <div className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/></svg> 1 policy</div>
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-emerald-200/80">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span className="text-[12px] font-bold text-emerald-700 tracking-tight">Fixed</span>
                 </div>
              </div>
           </div>
           
           {/* Row 6 */}
           <div className="grid grid-cols-[1fr_200px_200px_140px] px-6 py-4 border-b border-zinc-200/80 hover:bg-zinc-50/50 group items-center transition-colors">
              <div className="flex flex-col gap-1 pr-6">
                 <div className="text-[13px] font-bold text-zinc-900 tracking-tight leading-tight">Insecure Direct Object Reference (IDOR)</div>
                 <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                    All 5 checks are passing
                    <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center ml-auto"><span className="text-white text-[7px] font-bold">API</span></div>
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">TA</div>
                 <span className="text-[13px] font-bold text-zinc-900 tracking-tight">Tanvir Ahassan</span>
              </div>

              <div className="flex flex-col gap-1 text-[13px] font-medium text-zinc-600">
                 <div className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/></svg> 1 policy</div>
              </div>

              <div>
                 <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-emerald-200/80">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span className="text-[12px] font-bold text-emerald-700 tracking-tight">Fixed</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
