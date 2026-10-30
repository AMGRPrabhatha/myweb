'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from './HeroTicker.module.css';

const messages = ['No hidden fees', 'Fast delivery', '24/7 customer service', 'Clear milestones', 'Full asset ownership', 'One connected team'];

export default function HeroTicker({ fullBleed = false }: { fullBleed?: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <aside className={`${styles.ticker} ${fullBleed ? styles.fullBleed : ''}`} aria-label="Our service commitments" data-paused={paused}>
      <p className="sr-only">{messages.join('. ')}.</p>
      <div className={styles.viewport}>
        <div className={styles.track} aria-hidden="true">
          {[0, 1].map(copy => <div className={styles.group} key={copy}>{messages.map(message => <span key={message}>{message}<i /></span>)}</div>)}
        </div>
      </div>
      <button type="button" onClick={() => setPaused(!paused)} className={styles.toggle} aria-label={paused ? 'Resume scrolling messages' : 'Pause scrolling messages'} aria-pressed={paused}>
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
    </aside>
  );
}
