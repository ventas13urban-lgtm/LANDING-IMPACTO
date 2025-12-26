import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = '', 
  wordClassName = '',
  charClassName = '' 
}) => {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className={`inline-block whitespace-nowrap ${wordClassName}`}>
          {word.split('').map((char, j) => (
            <span key={j} className={`inline-block ${charClassName}`}>
              {char}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};