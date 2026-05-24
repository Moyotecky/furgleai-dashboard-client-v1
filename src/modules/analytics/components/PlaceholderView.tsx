import React from 'react';

export function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-zinc-500 tracking-tight max-w-[320px] leading-relaxed">
        This view is currently under development. Analytics data will be populated in an upcoming release.
      </p>
    </div>
  );
}
