import styles from './TypewriterText.module.css';

export default function TypewriterText({ lines }: { lines: string[] }) {
  let characterIndex = 0;

  return <>
    <span className="sr-only">{lines.join(' ')}</span>
    <span aria-hidden="true">
      {lines.map((line, lineIndex) => <span key={`${line}-${lineIndex}`}>
        {line.split(/(\s+)/).map((part, partIndex) => {
          if (/^\s+$/.test(part)) {
            characterIndex += part.length;
            return part;
          }

          return <span className={styles.word} key={`${part}-${partIndex}`}>
            {Array.from(part).map((character, index) => {
              const delay = characterIndex++ * 24;
              return <span className={styles.character} style={{ animationDelay: `${delay}ms` }} key={`${character}-${index}`}>{character}</span>;
            })}
          </span>;
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>)}
    </span>
  </>;
}
