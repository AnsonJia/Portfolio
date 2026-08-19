import React from 'react';

export default function CodeTag({//displau a tag takes 2 props
  children,
  className = '',
}: {
  children: React.ReactNode;//generic
  className?: string;//optional
}) {
  return (//format
    <div className={`code-tag ${className}`}>
      &lt; {children} /&gt;
    </div>
  );
}
//scss in typography