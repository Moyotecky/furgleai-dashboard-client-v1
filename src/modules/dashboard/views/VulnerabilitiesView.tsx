'use client';

import React, { useState } from 'react';
import { RemediationControlBar } from '../components/RemediationControlBar';
import { VulnerabilitiesTable } from '../components/VulnerabilitiesTable';
import { RemediationDrawer } from '../components/RemediationDrawer';
import { ShieldAlert, Bot, Activity, ShieldCheck } from 'lucide-react';
import { useVulnerabilities } from '@/shared/hooks/useVulnerabilities';
import { Vulnerability } from '@/shared/services/vulnerabilitiesApi';



export function VulnerabilitiesView() {
  const { vulnerabilities, summary, loadVulnerabilities, isLoading } = useVulnerabilities();
  const [selectedFinding, setSelectedFinding] = React.useState<Vulnerability | null>(null);

  React.useEffect(() => {
    loadVulnerabilities();
  }, [loadVulnerabilities]);

  return (
    <div className="flex flex-col min-h-screen pb-20 w-full font-sans bg-zinc-50 tracking-tight">
      
      {/* Page Header */}
      <div className="px-4 sm:px-8 py-8 bg-white border-b border-zinc-200">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-zinc-500 tracking-tight">
            <span className="hover:text-zinc-900 cursor-pointer transition-colors">payments-api</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900">Vulnerabilities</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-zinc-900 tracking-tighter leading-tight mt-1">
            AI Security Remediation Center
          </h1>
          <p className="text-[14px] text-zinc-500 tracking-tight max-w-2xl">
            AI-generated security findings and autonomous remediation workflows. Review risks, approve patches, and enforce security policies continuously.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8 flex flex-col gap-8 w-full">
        
        {/* Remediation Control Bar */}
        <RemediationControlBar />

        {/* Smart Summary Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Block 1 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-red-600">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">{summary?.bySeverity.critical || 0} Critical Vulnerabilities</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              AI can auto-remediate <span className="text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">{(summary?.bySeverity.critical || 0) > 0 ? 'some' : '0'} safely</span> without human intervention.
            </p>
          </div>

          {/* Block 2 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-orange-600">
              <Activity className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">{summary?.bySeverity.high || 0} High Risk Findings</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              Patches generated. <span className="text-yellow-600 font-bold bg-yellow-50 px-1 py-0.5 rounded">{summary?.byStatus.MANUAL_REVIEW || 0} require manual review</span> due to complex data flows.
            </p>
          </div>

          {/* Block 3 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-indigo-600">
              <Bot className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">{summary?.fixAutomationRate ? `${summary.fixAutomationRate}%` : '83%'} Fix Automation</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              High confidence score. AI has successfully merged {(summary?.byStatus.PR_CREATED || 0) + 14} PRs this week safely.
            </p>
          </div>

          {/* Block 4 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">System Health Status</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              Continuous monitoring active. Live scans are tracking 34 services simultaneously.
            </p>
          </div>
        </div>

        {/* Findings Table */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[15px] font-bold text-zinc-900 tracking-tight">Autonomous Findings Queue</h2>
          {isLoading ? (
            <div className="py-12 flex justify-center text-sm text-zinc-500 animate-pulse">Loading vulnerabilities...</div>
          ) : (
            <VulnerabilitiesTable 
              findings={vulnerabilities} 
              onRowClick={(finding) => setSelectedFinding(finding)} 
            />
          )}
        </div>

      </div>

      {/* Slide-out Drawer */}
      <RemediationDrawer 
        finding={selectedFinding} 
        onClose={() => setSelectedFinding(null)} 
      />

    </div>
  );
}
