import { useMemo, useState } from 'react';
import type { Annotation, CapedDimension } from '@/content/config';

interface Props {
  text: string;
  annotations: Annotation[];
}

interface Segment {
  kind: 'text' | 'annotation';
  value: string;
  annotation?: Annotation;
}

interface ActiveAnnotation {
  note: string;
  dimension: CapedDimension;
}

function buildSegments(text: string, annotations: Annotation[]): Segment[] {
  if (annotations.length === 0) {
    return [{ kind: 'text', value: text }];
  }

  const sorted = [...annotations].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));
  const segments: Segment[] = [];
  let cursor = 0;

  for (const annotation of sorted) {
    const index = text.indexOf(annotation.text, cursor);
    if (index === -1) {
      continue;
    }

    if (index > cursor) {
      segments.push({ kind: 'text', value: text.slice(cursor, index) });
    }

    segments.push({ kind: 'annotation', value: annotation.text, annotation });
    cursor = index + annotation.text.length;
  }

  if (cursor < text.length) {
    segments.push({ kind: 'text', value: text.slice(cursor) });
  }

  return segments.length > 0 ? segments : [{ kind: 'text', value: text }];
}

export default function AnnotatedText({ text, annotations }: Props) {
  const segments = useMemo(() => buildSegments(text, annotations), [text, annotations]);
  const [active, setActive] = useState<ActiveAnnotation | null>(null);

  return (
    <div className="annotated-text">
      <p>
        {segments.map((segment, index) => {
          if (segment.kind === 'text') {
            return <span key={index}>{segment.value}</span>;
          }

          const dimension = segment.annotation?.dimension ?? 'input';
          const note = segment.annotation?.note ?? '';

          return (
            <span
              key={index}
              className={`caped-${dimension}`}
              role="button"
              tabIndex={0}
              aria-describedby={note ? `note-${index}` : undefined}
              onMouseEnter={() => setActive({ note, dimension })}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive({ note, dimension })}
              onBlur={() => setActive(null)}
            >
              {segment.value}
            </span>
          );
        })}
      </p>

      {active && (
        <aside className={`caped-note caped-note-${active.dimension}`} aria-live="polite">
          {active.note}
        </aside>
      )}
    </div>
  );
}
