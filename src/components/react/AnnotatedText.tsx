import { useMemo } from 'react';
import type { Annotation, CapedDimension } from '@/content/config';
import { capedDimensionLabels } from '@/config/site';

interface Props {
  text: string;
  annotations: Annotation[];
}

interface Segment {
  kind: 'text' | 'annotation';
  value: string;
  annotation?: Annotation;
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

  return (
    <div className="annotated-text">
      <p>
        {segments.map((segment, index) => {
          if (segment.kind === 'text') {
            return <span key={index}>{segment.value}</span>;
          }

          const dimension = segment.annotation?.dimension ?? 'input';
          const label = capedDimensionLabels[dimension as CapedDimension];

          return (
            <span
              key={index}
              className={`caped-${dimension} caped-annotated`}
              tabIndex={0}
              aria-label={`${segment.value} (${label})`}
            >
              {segment.value}
              <span className={`caped-dimension-tooltip caped-dimension-tooltip-${dimension}`}>
                {label}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
}
