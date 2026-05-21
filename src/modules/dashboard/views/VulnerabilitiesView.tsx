'use client';

import React, { useState } from 'react';
import { RemediationControlBar } from '../components/RemediationControlBar';
import { VulnerabilitiesTable, Vulnerability } from '../components/VulnerabilitiesTable';
import { RemediationDrawer } from '../components/RemediationDrawer';
import { ShieldAlert, Bot, Activity, ShieldCheck } from 'lucide-react';

const MOCK_FINDINGS: Vulnerability[] = [
  // READY_TO_FIX
  {
    id: 'vuln-1', severity: 'critical', title: 'SQL Injection in user lookup', status: 'READY_TO_FIX',
    source: 'Live Scan', file: 'api/payments.ts', updatedAt: '2m ago',
    description: 'FurgleAI detected unsanitized user input being interpolated directly into a SQL query.',
    attackPath: ['Unauthorized DB access', 'Payment record leakage'],
    codeSegment: 'const query = `SELECT * FROM transactions WHERE user_id = ${req.body.userId}`;',
    patchCode: 'const query = \'SELECT * FROM transactions WHERE user_id = $1\';',
    confidence: 94
  },
  {
    id: 'vuln-12', severity: 'high', title: 'Cross-Site Scripting (XSS)', status: 'READY_TO_FIX',
    source: 'PR Review', file: 'components/Profile.tsx', updatedAt: '10m ago',
    description: 'Unescaped user input rendered directly to DOM.',
    attackPath: ['Session hijacking', 'Malicious script execution'],
    codeSegment: '<div dangerouslySetInnerHTML={{ __html: userBio }} />',
    patchCode: '<div>{sanitize(userBio)}</div>',
    confidence: 91
  },
  {
    id: 'vuln-14', severity: 'medium', title: 'Missing CSRF Token', status: 'READY_TO_FIX',
    source: 'Live Scan', file: 'api/settings.ts', updatedAt: '1h ago',
    description: 'State-changing endpoint lacks CSRF protection.',
    attackPath: ['Unauthorized state changes via forged requests'],
    codeSegment: 'app.post("/update-email", (req, res) => { ... })',
    patchCode: 'app.post("/update-email", csrfProtection, (req, res) => { ... })',
    confidence: 88
  },

  // FIX_GENERATING
  {
    id: 'vuln-4', severity: 'high', title: 'Unsafe eval() execution', status: 'FIX_GENERATING',
    source: 'Live Scan', file: 'utils/parser.ts', updatedAt: '1h ago',
    description: 'Use of eval() with potentially untrusted input can lead to arbitrary code execution.',
    attackPath: ['Remote Code Execution (RCE)'],
    codeSegment: 'const result = eval(userFormula);',
    patchCode: '// Generating AST-safe replacement...',
    confidence: 85
  },
  {
    id: 'vuln-5', severity: 'critical', title: 'Path Traversal Vulnerability', status: 'FIX_GENERATING',
    source: 'Commit Scan', file: 'api/download.ts', updatedAt: '2h ago',
    description: 'User input controls file path without validation.',
    attackPath: ['Arbitrary file read', 'Source code disclosure'],
    codeSegment: 'const file = fs.readFileSync(path.join(__dirname, req.query.file));',
    patchCode: '// Analyzing safe path resolution...',
    confidence: 72
  },

  // FIX_GENERATED
  {
    id: 'vuln-2', severity: 'high', title: 'Weak JWT Validation', status: 'FIX_GENERATED',
    source: 'Live Scan', file: 'auth/token.ts', updatedAt: '5m ago',
    description: 'JWT verification lacks algorithm enforcement.',
    attackPath: ['Token forgery'],
    codeSegment: 'const decoded = jwt.verify(token, process.env.JWT_SECRET);',
    patchCode: 'const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });',
    confidence: 98
  },
  {
    id: 'vuln-6', severity: 'medium', title: 'Insecure Direct Object Reference (IDOR)', status: 'FIX_GENERATED',
    source: 'Live Scan', file: 'api/invoices.ts', updatedAt: '3h ago',
    description: 'Missing ownership check on invoice fetch.',
    attackPath: ['Unauthorized data access'],
    codeSegment: 'const invoice = await db.invoices.find(req.params.id);',
    patchCode: 'const invoice = await db.invoices.findOne({ id: req.params.id, userId: req.user.id });',
    confidence: 95
  },
  {
    id: 'vuln-7', severity: 'low', title: 'Missing Rate Limiting', status: 'FIX_GENERATED',
    source: 'PR Review', file: 'api/login.ts', updatedAt: '4h ago',
    description: 'Login endpoint lacks brute-force protection.',
    attackPath: ['Credential stuffing', 'Account lockout'],
    codeSegment: 'app.post("/login", async (req, res) => { ... })',
    patchCode: 'app.post("/login", loginRateLimiter, async (req, res) => { ... })',
    confidence: 99
  },

  // MANUAL_REVIEW
  {
    id: 'vuln-3', severity: 'critical', title: 'Hardcoded API Secret', status: 'MANUAL_REVIEW',
    source: 'Commit Scan', file: '.env.example', updatedAt: '12m ago',
    description: 'Production secret committed to repository.',
    attackPath: ['Third-party API compromise'],
    codeSegment: 'STRIPE_KEY=sk_live_51Nx...',
    patchCode: '// Requires manual secret rotation.',
    confidence: 100
  },
  {
    id: 'vuln-8', severity: 'high', title: 'Complex Logic Flaw in Billing', status: 'MANUAL_REVIEW',
    source: 'Live Scan', file: 'services/billing.ts', updatedAt: '1d ago',
    description: 'Race condition detected during subscription downgrade.',
    attackPath: ['Financial loss', 'Service abuse'],
    codeSegment: 'await removeFeatures();\nawait refundUser();',
    patchCode: '// Manual review required to ensure atomic transaction.',
    confidence: 45
  },

  // PR_CREATED
  {
    id: 'vuln-9', severity: 'medium', title: 'Outdated Dependency (lodash)', status: 'PR_CREATED',
    source: 'Dependency Scan', file: 'package.json', updatedAt: '2d ago',
    description: 'Vulnerable version of lodash allows prototype pollution.',
    attackPath: ['Prototype pollution'],
    codeSegment: '"lodash": "^4.17.15"',
    patchCode: '"lodash": "^4.17.21"',
    confidence: 100
  },
  {
    id: 'vuln-10', severity: 'low', title: 'Missing Security Headers', status: 'PR_CREATED',
    source: 'Live Scan', file: 'middleware/helmet.ts', updatedAt: '3d ago',
    description: 'HSTS and Frame-Options headers are not set.',
    attackPath: ['Clickjacking', 'Man-in-the-middle'],
    codeSegment: 'app.use(helmet());',
    patchCode: 'app.use(helmet({ hsts: true, frameguard: { action: "deny" } }));',
    confidence: 100
  }
];

export function VulnerabilitiesView() {
  const [selectedFinding, setSelectedFinding] = useState<Vulnerability | null>(null);

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
              <span className="text-[14px] font-bold tracking-tight">4 Critical Vulnerabilities</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              AI can auto-remediate <span className="text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">3 safely</span> without human intervention.
            </p>
          </div>

          {/* Block 2 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-orange-600">
              <Activity className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">12 High Risk Findings</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              Patches generated. <span className="text-yellow-600 font-bold bg-yellow-50 px-1 py-0.5 rounded">2 require manual review</span> due to complex data flows.
            </p>
          </div>

          {/* Block 3 */}
          <div className="bg-white border border-zinc-200 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm group hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-indigo-600">
              <Bot className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-tight">83% Fix Automation</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-600 tracking-tight leading-relaxed">
              High confidence score. AI has successfully merged 14 PRs this week safely.
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
          <VulnerabilitiesTable 
            findings={MOCK_FINDINGS} 
            onRowClick={(finding) => setSelectedFinding(finding)} 
          />
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
