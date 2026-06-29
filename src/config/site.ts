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
    description: 'Skills for selecting chart types and matching form to analytical tasks.',
  },
  {
    id: 'abstraction',
    label: 'Abstraction',
    short: 'A',
    description: 'Skills for mapping data concepts to visual variables and structures.',
  },
  {
    id: 'paradigm',
    label: 'Paradigm',
    short: 'P',
    description: 'Skills tied to the authoring interaction model (code, GUI, prompts, etc.).',
  },
  {
    id: 'expression',
    label: 'Expression',
    short: 'E',
    description: 'Skills for specifying low-level visual details and custom marks.',
  },
  {
    id: 'input',
    label: 'Input Data',
    short: 'D',
    description: 'Skills for preparing, understanding, and shaping source data.',
  },
];
