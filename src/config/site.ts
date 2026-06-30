import type { CapedDimension } from '@/content/config';

export const capedDimensions: {
  id: CapedDimension;
  label: string;
  short: string;
  description: string;
}[] = [
  {
    id: 'output',
    label: 'Output Chart',
    short: 'C',
    description: 'Target chart design to describe and understand.',
  },
  {
    id: 'abstraction',
    label: 'Abstraction',
    short: 'A',
    description: 'Conceptual model of what a chart is.',
  },
  {
    id: 'paradigm',
    label: 'Paradigm',
    short: 'P',
    description: 'High-level approach to authoring a chart.',
  },
  {
    id: 'expression',
    label: 'Expression',
    short: 'E',
    description: 'Medium-level for articulating chart design.',
  },
  {
    id: 'input',
    label: 'Input Data',
    short: 'D',
    description: 'Skills for preparing the data for the chart.',
  },
];

export const capedDimensionLabels = Object.fromEntries(
  capedDimensions.map((dim) => [dim.id, dim.label])
) as Record<CapedDimension, string>;
