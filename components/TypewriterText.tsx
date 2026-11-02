'use client';

import { useEffect, useState } from 'react';
import styles from './TypewriterText.module.css';

const LETTER_DELAY_MS = 12;

export default function TypewriterText({ lines }: { lines: string[] }) {
  const [complete, setComplete] = useState(false);
  const text = lines.join('\n');

  useEffect(() => {
    setComplete(false);
    const characterCount = Array.from(text).length;
    const timeout = window.setTimeout(() => setComplete(true), characterCount * LETTER_DELAY_MS + 150);
    return () => window.clearTimeout(timeout);
  }, [text]);

  let characterIndex = 0;

  return <>
    <span className="sr-only">{lines.join(' ')}</span>
    <span aria-hidden="true" className={complete ? styles.complete : undefined}>
      {lines.map((line, lineIndex) => <span key={`${line}-${lineIndex}`}>
        {line.split(/(\s+)/).map((part, partIndex) => {
          if (/^\s+$/.test(part)) {
            characterIndex += part.length;
            return part;
          }

          return <span className={styles.word} key={`${part}-${partIndex}`}>
            {Array.from(part).map((character, index) => {
              const delay = characterIndex++ * LETTER_DELAY_MS;
              return <span className={styles.character} style={{ animationDelay: `${delay}ms` }} key={`${character}-${index}`}>{character}</span>;
            })}
          </span>;
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>)}
    </span>
  </>;
}
