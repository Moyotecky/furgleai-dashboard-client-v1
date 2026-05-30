'use client';

import { X, Copy, CheckCircle2, AlertCircle, RefreshCw, GitPullRequest, ArrowRight } from 'lucide-react';
import { useVulnerabilities } from '@/shared/hooks/useVulnerabilities';
import { Vulnerability } from '@/shared/services/vulnerabilitiesApi';

interface RemediationDrawerProps {
  finding: Vulnerability | null;
  onClose: () => void;
}

export function RemediationDrawer({ finding, onClose }: RemediationDrawerProps) {
  const { generateFix, approveFix, dismissVulnerability, isActionLoading } = useVulnerabilities();

  const handleApplyFix = async () => {
    if (!finding) return;
    try {
      await approveFix(finding.id, { fixId: 'fix-' + finding.id, prTitle: `Fix ${finding.title}`, autoMerge: true });
      onClose();
    } catch (e) {
      // toast handles error
    }
  };

  const handleRegenerate = async () => {
    if (!finding) return;
    try {
      await generateFix(finding.id, { preferredApproach: 'alternative' });
      // Don't close so they see state change
    } catch (e) {
      // toast handles error
    }
  };

  const handleDismiss = async () => {
    if (!finding) return;
    try {
      await dismissVulnerability(finding.id, 'acceptable_risk');
      onClose();
    } catch (e) {
      // toast handles error
    }
  };

  if (!finding) return null;

  return (
    <>
      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/20 backdrop-blur-sm z-[100] transition-opacity"
        style={{ animation: 'backdropFadeIn 0.2s ease-out' }}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="fixed inset-y-0 right-0 w-full max-w-[600px] bg-white border-l border-zinc-200 shadow-2xl z-[110] flex flex-col"
        style={{ animation: 'drawerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 bg-white sticky top-0 z-10">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{finding.title}</h2>
            <div className="flex items-center gap-3">
              <span className={`text-[12px] font-semibold px-2 py-0.5 rounded ${
                finding.severity === 'critical' ? 'bg-red-50 text-red-700 border border-red-100' :
                finding.severity === 'high' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                'bg-yellow-50 text-yellow-700 border border-yellow-100'
              }`}>
                {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
              </span>
              <span className={`text-[12px] font-bold px-2 py-0.5 rounded font-mono tracking-tight ${
                finding.status === 'READY_TO_FIX' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                finding.status === 'FIX_GENERATED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                finding.status === 'MANUAL_REVIEW' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                'bg-zinc-100 text-zinc-700 border border-zinc-200'
              }`}>
                {finding.status}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 bg-zinc-50/30">
          
          {/* AI Analysis */}
          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              AI Analysis
            </h3>
            <div className="text-[14px] text-zinc-800 leading-relaxed bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
              {finding.description}
            </div>
          </section>

          {/* Attack Path */}
          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" />
              Attack Path
            </h3>
            <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
              <p className="text-[13px] font-semibold text-zinc-900 mb-2">Potential exploitation:</p>
              <ul className="flex flex-col gap-2">
                {finding.attackPath.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-zinc-600">
                    <span className="text-zinc-400 mt-0.5">•</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Affected Code */}
          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Affected Code</h3>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <span className="text-[12px] text-zinc-400 font-mono tracking-tight">{finding.file}</span>
                <button className="text-zinc-500 hover:text-zinc-300">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <pre className="p-4 text-[13px] font-mono text-zinc-300 overflow-x-auto">
                <code>{typeof finding.codeSegment === 'string' ? finding.codeSegment : (finding.codeSegment?.before + '\n' + finding.codeSegment?.after)}</code>
              </pre>
            </div>
          </section>

          {/* AI Generated Patch */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AI Generated Patch
              </h3>
              <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                Confidence: {finding.confidence}%
              </span>
            </div>
            
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden shadow-sm relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 pl-5">
                <span className="text-[12px] text-zinc-400 font-mono tracking-tight">Proposed Change</span>
              </div>
              <pre className="p-4 text-[13px] font-mono overflow-x-auto pl-5">
                <code dangerouslySetInnerHTML={{ __html: finding.patchCode }} />
              </pre>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-zinc-200 flex flex-col gap-3 sticky bottom-0 z-10">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleApplyFix}
              disabled={isActionLoading || finding.status !== 'FIX_GENERATED'}
              className="flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg font-semibold text-[14px] shadow-sm transition-colors active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Apply AI Fix
            </button>
            <button 
              onClick={handleApplyFix}
              disabled={isActionLoading || finding.status !== 'FIX_GENERATED'}
              className="flex items-center justify-center gap-2 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 px-4 py-2.5 rounded-lg font-semibold text-[14px] shadow-sm transition-colors active:scale-[0.98]"
            >
              <GitPullRequest className="w-4 h-4" />
              Generate PR
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleRegenerate}
              disabled={isActionLoading || finding.status === 'PR_CREATED'}
              className="flex items-center justify-center gap-2 bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-[13px] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isActionLoading && finding.status === 'FIX_GENERATING' ? 'animate-spin' : ''}`} />
              Regenerate Patch
            </button>
            <button 
              onClick={handleDismiss}
              disabled={isActionLoading}
              className="flex items-center justify-center gap-2 bg-white border border-zinc-200 text-yellow-600 hover:bg-yellow-50 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-[13px] transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              Dismiss Finding
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
