'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mock list of countries
const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Germany',
  'Canada',
  'France',
  'Australia',
  'Nigeria',
  'South Africa',
  'Japan',
  'Brazil',
];

// IDE options
const IDES = [
  { id: 'vscode', name: 'VS Code', icon: '⚡' },
  { id: 'jetbrains', name: 'JetBrains', icon: '💎' },
  { id: 'cursor', name: 'Cursor IDE', icon: '🤖' },
  { id: 'neovim', name: 'NeoVim', icon: '💤' },
];

// Use case options
const USE_CASES = [
  { id: 'ci_cd', name: 'CI/CD Pipeline Gate', desc: 'Secure commits on push/PR automatically.' },
  { id: 'local_ide', name: 'Local IDE Audits', desc: 'Scan and review alerts right in editor.' },
  { id: 'pr_reviews', name: 'AI PR Security Reviews', desc: 'Auto-remediate vulnerabilities before merge.' },
  { id: 'compliance', name: 'SOC2 Policy Compliance', desc: 'Enforce security boundaries org-wide.' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: 'developer@furgle.ai',
    orgName: '',
    orgHandle: '',
    country: 'United States',
    primaryIDE: 'vscode',
    useCase: 'ci_cd',
    teamSize: 'Just me',
    subscribeUpdates: false,
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  });

  // State to track active focused elements for the right side zoom animation
  const [zoomTarget, setZoomTarget] = useState<'profile' | 'workspace' | 'pipeline' | 'team' | 'none'>('profile');

  // Automatically update zoom targets as step changes
  useEffect(() => {
    if (currentStep === 1) {
      setZoomTarget('profile');
    } else if (currentStep === 2) {
      setZoomTarget('workspace');
    } else if (currentStep === 3) {
      setZoomTarget('team');
    } else if (currentStep === 4) {
      setZoomTarget('pipeline');
    } else {
      setZoomTarget('none');
    }
  }, [currentStep]);

  const handleInputChange = (field: string, val: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: val };
      // Generate workspace slug automatically
      if (field === 'orgName') {
        updated.orgHandle = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Simulate backend onboarding/profile complete lag
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push('/'); // Navigate to dashboard home
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Right Side Zoom Viewport Coordinates
  // We use Framer Motion to transform, scale, and align the dashboard viewport smoothly
  const getTransformStyles = () => {
    switch (zoomTarget) {
      case 'profile':
        return { scale: 1.6, x: '20%', y: '-30%' };
      case 'workspace':
        return { scale: 1.5, x: '18%', y: '30%' };
      case 'team':
        return { scale: 1.3, x: '-10%', y: '0%' };
      case 'pipeline':
        return { scale: 1.4, x: '-15%', y: '15%' };
      case 'none':
      default:
        return { scale: 1, x: '0%', y: '0%' };
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-zinc-950 flex font-sans overflow-hidden">
      
      {/* LEFT PANEL - Onboarding Form questionnaire */}
      <div className="w-full lg:w-[48%] min-h-screen flex flex-col justify-between px-6 py-8 md:px-12 md:py-10 bg-white relative z-10 shadow-xl border-r border-zinc-100">
        
        {/* Top Header Indicators */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 bg-zinc-950 rounded-xl flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor">
                <path d="M6 17 L12 11 L18 17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11 L12 5 L18 11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-[14.5px] tracking-tighter font-secondary text-zinc-950">FurgleAI</span>
          </div>

          {/* Stepper counter indicator */}
          <span className="text-[12.5px] font-bold text-zinc-400 font-tertiary tracking-tight">
            {currentStep} / 5
          </span>
        </div>

        {/* Dynamic Nested steps wizard container */}
        <div className="flex-1 flex flex-col justify-center max-w-[420px] mx-auto w-full my-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              
              {/* STEP 1: Let's Get to Know You */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h2 className="text-[30px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight">
                      Let&apos;s get to know you
                    </h2>
                    <p className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight leading-relaxed">
                      Set up your profile picture and legal details to start auditing code.
                    </p>
                  </div>

                  {/* Profile Picture Upload row */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Profile picture</label>
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-200 bg-zinc-50 relative select-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={formData.profilePic} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-[36px] px-3.5 border border-zinc-200 rounded-lg text-[13px] font-semibold text-zinc-950 hover:bg-zinc-50 transition-colors flex items-center gap-1.5 tracking-tight cursor-pointer focus:outline-none"
                          onClick={() => {
                            // Cycle user avatars for neat mockup interactions
                            const pics = [
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
                              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
                              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&h=256&q=80',
                            ];
                            const currentIdx = pics.indexOf(formData.profilePic);
                            const nextPic = pics[(currentIdx + 1) % pics.length];
                            handleInputChange('profilePic', nextPic);
                          }}
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Replace image
                        </button>
                        <button
                          type="button"
                          className="h-[36px] px-3.5 rounded-lg text-[13px] font-semibold text-zinc-400 hover:text-zinc-600 transition-colors tracking-tight cursor-pointer focus:outline-none"
                          onClick={() => handleInputChange('profilePic', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80')}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="text-[11.5px] text-zinc-400 font-tertiary tracking-tight mt-1">
                      *.png, *.jpeg files up to 10MB at least 400px by 400px
                    </span>
                  </div>

                  {/* Fields */}
                  <div className="flex flex-col gap-4 text-left">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">First name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full h-[40px] px-3.5 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[13.5px] outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Last name</label>
                        <input
                          type="text"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full h-[40px] px-3.5 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[13.5px] outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Email</label>
                      <input
                        type="email"
                        disabled
                        value={formData.email}
                        className="w-full h-[40px] px-3.5 bg-zinc-50 text-zinc-400 border border-zinc-200 rounded-xl text-[13.5px] outline-none cursor-not-allowed tracking-tight"
                      />
                    </div>

                    {/* Newsletter toggle */}
                    <div className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-xl mt-2 select-none border border-zinc-100">
                      <div className="flex flex-col text-left">
                        <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">Subscribe to update newsletters</span>
                        <span className="text-[11.5px] text-zinc-400 font-tertiary tracking-tight">Get features and scan intelligence notes.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInputChange('subscribeUpdates', !formData.subscribeUpdates)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none cursor-pointer ${
                          formData.subscribeUpdates ? 'bg-zinc-950' : 'bg-zinc-200'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                            formData.subscribeUpdates ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Create Your Workspace */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h2 className="text-[30px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight">
                      Create your workspace
                    </h2>
                    <p className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight leading-relaxed">
                      This is the home for your team, connected repositories, and security scanning audits.
                    </p>
                  </div>

                  {/* Logo Placeholder */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Workspace logo</label>
                    <div className="flex items-center gap-4">
                      {/* Logo Ring */}
                      <div className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-bold text-lg shadow-md border border-zinc-800 uppercase select-none">
                        {formData.orgName ? formData.orgName.substring(0, 2) : 'FW'}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-[36px] px-3.5 border border-zinc-200 rounded-lg text-[13px] font-semibold text-zinc-950 hover:bg-zinc-50 transition-colors flex items-center gap-1.5 tracking-tight cursor-pointer focus:outline-none"
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Upload image
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="flex flex-col gap-4 text-left">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Workspace name</label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={formData.orgName}
                        onChange={(e) => handleInputChange('orgName', e.target.value)}
                        className="w-full h-[40px] px-3.5 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[13.5px] outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Workspace handle</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[13px] text-zinc-400 select-none tracking-tight font-tertiary">
                          app.furgle.ai/
                        </span>
                        <input
                          type="text"
                          placeholder="acme-corp"
                          value={formData.orgHandle}
                          onChange={(e) => handleInputChange('orgHandle', e.target.value)}
                          className="w-full h-[40px] pl-[102px] pr-3.5 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[13.5px] outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight"
                        />
                      </div>
                    </div>

                    {/* Country Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Billing country</label>
                      <div className="relative">
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full h-[40px] px-3.5 bg-white text-zinc-950 border border-zinc-200 rounded-xl text-[13.5px] outline-none appearance-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 tracking-tight"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-zinc-400">
                          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Customize Team Size */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h2 className="text-[30px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight">
                      Who else is joining FurgleAI?
                    </h2>
                    <p className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight leading-relaxed">
                      Select your team sizing tier to pre-allocate collaborator seats and secure audit channels.
                    </p>
                  </div>

                  {/* Sizing Tiers Grid */}
                  <div className="flex flex-col gap-3 text-left">
                    {['Just me', '2-10 members', '11-50 members', '50+ members'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleInputChange('teamSize', size)}
                        className={`w-full p-4 border rounded-2xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer focus:outline-none ${
                          formData.teamSize === size
                            ? 'bg-zinc-50 border-zinc-950 shadow-sm'
                            : 'bg-white border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[14px] font-bold text-zinc-950 font-secondary tracking-tight">{size}</span>
                          <span className="text-[11.5px] text-zinc-400 font-tertiary tracking-tight">
                            {size === 'Just me' ? 'Provision a single-seat private secure node.' : 'Enables shared repository scanning and PR validation alerts.'}
                          </span>
                        </div>
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                          formData.teamSize === size ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300'
                        }`}>
                          {formData.teamSize === size && (
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Integrations & Use Cases */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h2 className="text-[30px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight">
                      Setup secure integrations
                    </h2>
                    <p className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight leading-relaxed">
                      Select your target developer environment and core security audit strategy.
                    </p>
                  </div>

                  {/* Primary IDE Row */}
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Primary IDE workspace</label>
                    <div className="grid grid-cols-4 gap-2">
                      {IDES.map((ide) => (
                        <button
                          key={ide.id}
                          type="button"
                          onClick={() => handleInputChange('primaryIDE', ide.id)}
                          className={`p-3 border rounded-xl flex flex-col items-center gap-1.5 justify-center text-center transition-all duration-200 cursor-pointer focus:outline-none ${
                            formData.primaryIDE === ide.id
                              ? 'bg-zinc-50 border-zinc-950 shadow-sm'
                              : 'bg-white border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <span className="text-xl">{ide.icon}</span>
                          <span className="text-[11.5px] font-bold text-zinc-950 font-secondary tracking-tight">{ide.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Use Case List */}
                  <div className="flex flex-col gap-2.5 text-left">
                    <label className="text-[13px] font-bold text-zinc-500 font-secondary tracking-tight">Main security strategy</label>
                    <div className="flex flex-col gap-2">
                      {USE_CASES.map((usecase) => (
                        <button
                          key={usecase.id}
                          type="button"
                          onClick={() => handleInputChange('useCase', usecase.id)}
                          className={`p-3 border rounded-xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer focus:outline-none ${
                            formData.useCase === usecase.id
                              ? 'bg-zinc-50 border-zinc-950 shadow-sm'
                              : 'bg-white border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">{usecase.name}</span>
                            <span className="text-[11px] text-zinc-400 font-tertiary tracking-tight">{usecase.desc}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            formData.useCase === usecase.id ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300'
                          }`}>
                            {formData.useCase === usecase.id && (
                              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Summary & Activation */}
              {currentStep === 5 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h2 className="text-[30px] font-bold tracking-tighter text-zinc-950 font-secondary leading-tight">
                      Ready to launch
                    </h2>
                    <p className="text-[13.5px] text-zinc-500 font-tertiary tracking-tight leading-relaxed">
                      Confirm your setup parameters. We will initialize your secure nodes, team limits, and indexing rules.
                    </p>
                  </div>

                  {/* Summary grid */}
                  <div className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl flex flex-col gap-3 text-left">
                    <div className="flex justify-between items-center border-b border-zinc-200/50 pb-2">
                      <span className="text-[12.5px] font-medium text-zinc-400 font-tertiary tracking-tight">Full Name</span>
                      <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">
                        {formData.firstName || 'Not provided'} {formData.lastName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-zinc-200/50 pb-2">
                      <span className="text-[12.5px] font-medium text-zinc-400 font-tertiary tracking-tight">Workspace Name</span>
                      <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">
                        {formData.orgName || 'My Workspace'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-zinc-200/50 pb-2">
                      <span className="text-[12.5px] font-medium text-zinc-400 font-tertiary tracking-tight">Workspace URL</span>
                      <span className="text-[13px] font-bold text-zinc-500 font-tertiary tracking-tight">
                        {formData.orgHandle ? `furgle.ai/${formData.orgHandle}` : 'Not configured'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-zinc-200/50 pb-2">
                      <span className="text-[12.5px] font-medium text-zinc-400 font-tertiary tracking-tight">Team Sizing</span>
                      <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">
                        {formData.teamSize}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-1">
                      <span className="text-[12.5px] font-medium text-zinc-400 font-tertiary tracking-tight">IDE & Strategy</span>
                      <span className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">
                        {IDES.find(i => i.id === formData.primaryIDE)?.name} (
                        {formData.useCase === 'ci_cd' ? 'CI/CD' : 'IDE Audits'})
                      </span>
                    </div>
                  </div>

                  <p className="text-[12px] text-zinc-400 font-tertiary leading-relaxed text-left">
                    By clicking Launch, you authorize FurgleAI to configure your sandbox organization pipeline scan allocations and bind security policies.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center gap-3 w-full border-t border-zinc-100 pt-5">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="h-[40px] px-5 border border-zinc-200 rounded-xl text-[13.5px] font-bold font-secondary text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 active:scale-[0.99] transition-all tracking-tight cursor-pointer focus:outline-none flex items-center justify-center gap-1.5"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex-1 h-[40px] px-6 bg-zinc-950 text-white font-bold font-secondary rounded-xl hover:bg-zinc-900 active:scale-[0.99] transition-all tracking-tight cursor-pointer shadow-md flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Initializing Pipeline...</span>
              </>
            ) : (
              <>
                <span>{currentStep === 5 ? 'Launch Control Center' : 'Continue'}</span>
                {currentStep < 5 && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - High-fidelity live responsive animated dashboard mockup */}
      <div className="hidden lg:flex flex-1 min-h-screen bg-zinc-50 relative items-center justify-center p-8 select-none overflow-hidden">
        
        {/* Dynamic Glowing Spotlight Backdrop behind the dashboard */}
        <div className="absolute w-[600px] h-[600px] bg-zinc-200/50 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[6s]" />

        {/* Framing device wrapping the interactive viewport */}
        <div className="w-[880px] h-[580px] bg-white border border-zinc-200/80 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden relative">
          
          {/* Framer Motion Spring Zoom Viewport Wrapper */}
          <motion.div
            animate={getTransformStyles()}
            transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 1 }}
            className="w-full h-full flex origin-center"
          >
            
            {/* 1. MOCKUP SIDEBAR PANEL */}
            <div className="w-[200px] h-full border-r border-zinc-100 flex flex-col justify-between p-4 bg-zinc-50/50">
              
              <div className="flex flex-col gap-6">
                
                {/* 1a. Interactive Workspace Selector dropdown */}
                <motion.div 
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    zoomTarget === 'workspace' ? 'bg-zinc-50 border-zinc-300 ring-2 ring-zinc-950/5' : 'border-transparent hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2 max-w-[125px] overflow-hidden">
                    <div className="w-5.5 h-5.5 bg-zinc-950 rounded-md text-white flex items-center justify-center font-bold text-[10px] select-none shadow-sm uppercase shrink-0">
                      {formData.orgName ? formData.orgName.substring(0, 2) : 'FW'}
                    </div>
                    <span className="font-semibold text-[12px] text-zinc-800 tracking-tight truncate">
                      {formData.orgName || 'Workspace title'}
                    </span>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M8 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>

                {/* Left Side Static Links */}
                <div className="flex flex-col gap-1">
                  {[
                    { n: 'Overview', i: '📊' },
                    { n: 'Security Audits', i: '🛡️' },
                    { n: 'Vulnerabilities', i: '⚠️' },
                    { n: 'Connected Repos', i: '📦' },
                    { n: 'AI Remediation', i: '🤖' },
                    { n: 'Team Settings', i: '👥' },
                  ].map((link, idx) => (
                    <div
                      key={link.n}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-semibold tracking-tight transition-all duration-150 ${
                        idx === 0 
                          ? 'bg-zinc-950 text-white font-bold shadow-sm shadow-black/10' 
                          : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100'
                      }`}
                    >
                      <span className="text-sm shrink-0">{link.i}</span>
                      <span className="truncate">{link.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1b. Interactive User Profile Widget Bottom Sidebar */}
              <motion.div
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
                  zoomTarget === 'profile' ? 'bg-zinc-50 border-zinc-300 ring-2 ring-zinc-950/5 shadow-sm' : 'border-transparent'
                }`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={formData.profilePic} 
                    alt="User Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Details */}
                <div className="flex flex-col text-left overflow-hidden max-w-[100px]">
                  <span className="text-[11.5px] font-bold text-zinc-950 font-secondary tracking-tight truncate leading-none">
                    {formData.firstName || 'First Name'} {formData.lastName || 'Last'}
                  </span>
                  <span className="text-[10px] text-zinc-400 tracking-tight font-tertiary truncate leading-none mt-0.5">
                    {formData.email}
                  </span>
                </div>
              </motion.div>

            </div>

            {/* 2. MOCKUP WORKSPACE WORKSPACE VIEWS */}
            <div className="flex-1 h-full flex flex-col">
              
              {/* Header Bar */}
              <div className="h-[48px] border-b border-zinc-100 flex items-center justify-between px-6 bg-zinc-50/20">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-zinc-800 tracking-tight">Dashboard Overview</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-tight">Active</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 bg-zinc-200 rounded-full select-none" />
                  <div className="w-16 h-[24px] bg-zinc-100 rounded-md select-none" />
                </div>
              </div>

              {/* Main Canvas Workspace */}
              <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
                
                {/* Welcome Message Card */}
                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col text-left gap-0.5 max-w-[400px]">
                    <h4 className="text-[13px] font-bold text-zinc-950 font-secondary tracking-tight">
                      Welcome to your security center, {formData.firstName || 'Developer'}!
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-tertiary leading-relaxed tracking-tight">
                      Integrate your repositories to start live analysis, policy validation, and automated AI fixes.
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-zinc-950 rounded-lg text-[10px] text-white font-bold tracking-tight shadow-sm select-none">
                    Run Scan
                  </div>
                </div>

                {/* 2a. STEP-BASED HIGH-LIGHT PORTALS */}
                <div className="flex-1 grid grid-cols-1 gap-6 relative">
                  
                  {/* LIVE TEAM TABLE STAGE - Zoom target = team */}
                  {zoomTarget === 'team' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-zinc-200/80 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 text-left w-full max-w-[550px] mx-auto absolute inset-0 h-[260px] z-20"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-zinc-950 font-secondary tracking-tight">Workspace Collaborators</span>
                          <span className="text-[10px] text-zinc-400 font-tertiary tracking-tight">Tethered accounts in {formData.orgName || 'Acme Workspace'}.</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-bold tracking-tight">
                          Seats: {formData.teamSize}
                        </span>
                      </div>

                      {/* Mock list */}
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg border border-zinc-100 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6.5 h-6.5 rounded-full overflow-hidden border border-zinc-200 relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={formData.profilePic} alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11.5px] font-bold text-zinc-950 font-secondary tracking-tight">
                                {formData.firstName || 'Developer'} {formData.lastName || '(Owner)'}
                              </span>
                              <span className="text-[9.5px] text-zinc-400 tracking-tight font-tertiary">
                                Owner • {formData.email}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                        </div>

                        {formData.teamSize !== 'Just me' && (
                          <div className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg border border-zinc-100 transition-colors">
                            <div className="flex items-center gap-2.5">
                              <div className="w-6.5 h-6.5 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-[10px] text-zinc-600 uppercase border border-zinc-200">
                                SA
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11.5px] font-bold text-zinc-950 font-secondary tracking-tight">SecOps Agent (Auto-Assigned)</span>
                                <span className="text-[9.5px] text-zinc-400 tracking-tight font-tertiary">
                                  Collaborator • secops@furgle.ai
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded">Pending Invites</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* LIVE VISUAL CONNECTED PIPELINE STAGE - Zoom target = pipeline */}
                  {zoomTarget === 'pipeline' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-zinc-200/80 bg-white rounded-xl shadow-lg p-5 flex flex-col gap-4 text-left w-full max-w-[550px] mx-auto absolute inset-0 h-[260px] z-20 justify-center"
                    >
                      <h4 className="text-[12px] font-bold text-zinc-950 font-secondary tracking-tight text-center border-b border-zinc-100 pb-2">
                        Active Connection Node Pipeline
                      </h4>

                      {/* Connectors Row diagram */}
                      <div className="flex items-center justify-between px-4 relative mt-2">
                        
                        {/* Node 1: GitHub */}
                        <div className="flex flex-col items-center gap-1.5 z-10">
                          <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                            📦
                          </div>
                          <span className="text-[10.5px] font-bold text-zinc-950 tracking-tight font-secondary">GitHub Repo</span>
                        </div>

                        {/* Connector line 1 */}
                        <div className="flex-1 h-[2px] bg-zinc-200 mx-2 relative flex items-center justify-center">
                          <div className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[8px] font-bold bg-zinc-100 text-zinc-500 px-1.5 rounded-full py-0.5 border border-zinc-200 absolute -top-3 tracking-tight">
                            Live Audits
                          </span>
                        </div>

                        {/* Node 2: FurgleAI Scan pipeline */}
                        <div className="flex flex-col items-center gap-1.5 z-10">
                          <div className="w-11 h-11 bg-zinc-950 border border-zinc-800 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-md shadow-black/10">
                            🛡️
                          </div>
                          <span className="text-[10.5px] font-bold text-zinc-950 tracking-tight font-secondary">
                            {formData.useCase === 'ci_cd' ? 'CI/CD Gate' : 'AI PR Reviewer'}
                          </span>
                        </div>

                        {/* Connector line 2 */}
                        <div className="flex-1 h-[2px] bg-zinc-200 mx-2 relative flex items-center justify-center">
                          <div className="absolute w-2 h-2 rounded-full bg-zinc-950 animate-ping" />
                          <span className="text-[8px] font-bold bg-zinc-100 text-zinc-500 px-1.5 rounded-full py-0.5 border border-zinc-200 absolute -top-3 tracking-tight">
                            Alert Feed
                          </span>
                        </div>

                        {/* Node 3: Selected IDE */}
                        <div className="flex flex-col items-center gap-1.5 z-10">
                          <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center text-lg shadow-sm">
                            {formData.primaryIDE === 'vscode' ? '⚡' : formData.primaryIDE === 'jetbrains' ? '💎' : formData.primaryIDE === 'cursor' ? '🤖' : '💤'}
                          </div>
                          <span className="text-[10.5px] font-bold text-zinc-950 tracking-tight font-secondary">
                            {IDES.find(i => i.id === formData.primaryIDE)?.name || 'IDE'}
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* STANDARD DEFAULT STATE CARD */}
                  <div className="grid grid-cols-2 gap-4 opacity-50 blur-[0.5px]">
                    <div className="border border-zinc-100 rounded-xl p-4 flex flex-col gap-1 text-left bg-zinc-50/20">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Repositories Audit</span>
                      <span className="text-xl font-bold text-zinc-950">12 Connected</span>
                      <span className="text-[9.5px] text-emerald-600 font-semibold tracking-tight">No active alerts</span>
                    </div>

                    <div className="border border-zinc-100 rounded-xl p-4 flex flex-col gap-1 text-left bg-zinc-50/20">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Monthly Scan Limits</span>
                      <span className="text-xl font-bold text-zinc-950">100 Scans Free</span>
                      <span className="text-[9.5px] text-zinc-400 font-tertiary tracking-tight">Plan: Free Sandbox</span>
                    </div>
                  </div>

                  <div className="border border-zinc-100 rounded-xl p-4 flex flex-col gap-2 text-left opacity-30 blur-[1px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-zinc-950 font-secondary tracking-tight">Active Pipeline Stream</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-zinc-200" />
                    </div>
                    <div className="h-2 bg-zinc-100 rounded" />
                    <div className="h-2 bg-zinc-100 rounded w-5/6" />
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}
