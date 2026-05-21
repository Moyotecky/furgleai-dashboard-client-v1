'use client';

import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ChevronDown, ChevronRight, PlayCircle } from 'lucide-react';

export interface Vulnerability {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  status: 'READY_TO_FIX' | 'FIX_GENERATING' | 'FIX_GENERATED' | 'PR_CREATED' | 'MANUAL_REVIEW' | 'BLOCKED';
  source: string;
  file: string;
  updatedAt: string;
  description: string;
  attackPath: string[];
  codeSegment: string;
  patchCode: string;
  confidence: number;
}

interface VulnerabilitiesTableProps {
  findings: Vulnerability[];
  onRowClick: (finding: Vulnerability) => void;
}

const STATUS_GROUPS: { key: Vulnerability['status']; label: string }[] = [
  { key: 'MANUAL_REVIEW', label: 'In Review' },
  { key: 'FIX_GENERATING', label: 'Generating Fix' },
  { key: 'READY_TO_FIX', label: 'Ready to Fix' },
  { key: 'FIX_GENERATED', label: 'Fix Generated' },
  { key: 'PR_CREATED', label: 'PR Created' },
  { key: 'BLOCKED', label: 'Blocked' },
];

export function VulnerabilitiesTable({ findings, onRowClick }: VulnerabilitiesTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (status: string) => {
    const newSet = new Set(collapsedGroups);
    if (newSet.has(status)) {
      newSet.delete(status);
    } else {
      newSet.add(status);
    }
    setCollapsedGroups(newSet);
  };

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const getSeverityIcon = (severity: Vulnerability['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="text-[12px] text-zinc-500">Bug</span>
          </div>
        );
      case 'high':
        return (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[12px] text-zinc-500">Bug</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-[12px] text-zinc-500">Feature</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[12px] text-zinc-500">Chore</span>
          </div>
        );
    }
  };

  // Group the findings
  const groupedFindings = findings.reduce((acc, finding) => {
    if (!acc[finding.status]) acc[finding.status] = [];
    acc[finding.status].push(finding);
    return acc;
  }, {} as Record<string, Vulnerability[]>);

  return (
    <div className="w-full flex bg-white border border-zinc-200 rounded-lg  flex-col font-sans select-none">

      {/* List Header */}
      <div className="flex items-center justify-between py-3 px-2 border-b border-zinc-200 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-semibold text-zinc-900 tracking-tight px-6 py-2 pr-2">Active findings</span>
          <span className="text-[13px] text-zinc-500">{findings.length}</span>
          <button className="text-[12px] text-zinc-400 border border-zinc-200 border-dashed rounded px-2 py-0.5 ml-2 hover:bg-zinc-50 hover:text-zinc-600 transition-colors">
            + Filter
          </button>
        </div>
        {/* <button className="w-6 h-6 bg-indigo-500 hover:bg-indigo-600 rounded flex items-center justify-center text-white transition-colors shadow-sm">
          +
        </button> */}
      </div>

      {/* Grouped List */}
      <div className="flex flex-col gap-1 w-full">
        {STATUS_GROUPS.map((group) => {
          const groupFindings = groupedFindings[group.key] || [];
          if (groupFindings.length === 0) return null;

          const isCollapsed = collapsedGroups.has(group.key);

          return (
            <div key={group.key} className="flex flex-col w-full mb-4">

              {/* Group Header */}
              <div
                className="flex items-center justify-between px-2 py-1.5 mb-1 cursor-pointer group hover:bg-zinc-100 rounded transition-colors"
                onClick={() => toggleGroup(group.key)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded-[3px] border-zinc-300 text-indigo-500 focus:ring-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                  <span className="text-[13px] font-medium text-zinc-700 tracking-tight">{group.label}</span>
                  <span className="text-[12px] text-zinc-400">{groupFindings.length}</span>
                </div>
                <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-600">
                  +
                </button>
              </div>

              {/* Group Rows */}
              {!isCollapsed && (
                <div className="flex flex-col w-full">
                  {groupFindings.map((finding, idx) => {
                    const isSelected = selectedIds.has(finding.id);

                    return (
                      <div
                        key={finding.id}
                        onClick={() => onRowClick(finding)}
                        className={`flex items-center justify-between px-6 py-2 border-b border-zinc-100/60 cursor-pointer group hover:bg-zinc-50 transition-colors ${isSelected ? 'bg-indigo-50/30' : ''}`}
                      >
                        {/* Left Side: Checkbox + ID + Icon + Title */}
                        <div className="flex items-center gap-3 min-w-0">
                          <input
                            type="checkbox"
                            className={`w-3.5 h-3.5 rounded-[3px] border-zinc-300 text-indigo-500 focus:ring-0 cursor-pointer transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            checked={isSelected}
                            onChange={(e) => { e.stopPropagation(); toggleRow(finding.id, e as any); }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="text-[13px] text-zinc-400 font-mono tracking-tighter shrink-0 w-[50px]">
                            {finding.id.replace('vuln-', 'PAY-')}
                          </span>

                          <div className="flex items-center shrink-0">
                            {/* Linear-style status icon (mocked) */}
                            <svg className={`w-3.5 h-3.5 ${finding.severity === 'critical' ? 'text-red-500' : finding.severity === 'high' ? 'text-orange-500' : 'text-emerald-500'}`} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="8" cy="8" r="6" strokeDasharray={finding.status === 'READY_TO_FIX' ? "0" : "1 3"} />
                              {finding.status === 'FIX_GENERATED' && <path d="M5 8l2 2 4-4" strokeWidth="2" />}
                            </svg>
                          </div>

                          <span className="text-[13px] font-medium text-zinc-800 tracking-tight truncate group-hover:text-indigo-600 transition-colors ml-1">
                            {finding.title}
                          </span>
                        </div>

                        {/* Right Side: Badges & Meta */}
                        <div className="flex items-center gap-3 shrink-0 ml-4 opacity-70 group-hover:opacity-100 transition-opacity">

                          {/* Severity indicator */}
                          <div className="hidden sm:flex items-center px-1.5 py-0.5 bg-zinc-100 rounded-md gap-1.5 border border-zinc-200">
                            {getSeverityIcon(finding.severity)}
                          </div>

                          {/* File source badge */}
                          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-zinc-100 rounded-md border border-zinc-200 text-[12px] font-medium text-zinc-600 font-mono tracking-tight">
                            <span className="text-[10px] text-zinc-400">#</span>
                            {finding.file.split('/').pop()}
                          </div>

                          {/* Play/Scan icon */}
                          <div className="hidden md:flex items-center text-zinc-400 gap-1 px-1">
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span className="text-[12px]">1</span>
                          </div>

                          {/* Date */}
                          <span className="text-[12px] text-zinc-500 w-[45px] text-right tracking-tight hidden sm:block">
                            {finding.updatedAt.split(' ')[0]}
                          </span>

                          {/* Avatar */}
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-200 relative shrink-0 border border-zinc-200 shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user" className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
