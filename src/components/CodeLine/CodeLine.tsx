import React from 'react';
import './CodeLine.scss';

export default function CodeLine({//displays line of code with line num for sidebar takes 3 props
  number,
  children,
  className = '',
}: {//type restriction
  number: string;
  children: React.ReactNode;//can put anything here
  className?: string;//optional with default ''
}) {
  return (
    <div className={`code-line ${className}`}>
      <div className="code-line__number">{number}</div>
      <div className="code-line__code">{children}</div>
    </div>
  );
}