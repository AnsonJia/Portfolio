import React from 'react';
import { Link } from 'react-router-dom';
import './ActionButton.scss';

export default function ActionButton({
  to,
  children,
  target,
  className = '',
}: {
  to: string;//destination path
  children: React.ReactNode;//button text
  target?: string;//_blank for new tab
  className?: string;//css
}) {
  const props = {//mapping to obj
    className: `action-button mouse-md ${className}`,
    target,
    rel: target === '_blank' ? 'noopener noreferrer' : undefined,
  };

  return /^https?:|^mailto:/.test(to) ? (//to site or to mail
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}