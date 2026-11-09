export type Locale = 'pt' | 'en' | 'es';
export type Theme = 'light' | 'dark';
export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'academic' | 'client';
export type ProjectTone = 'mint' | 'coral' | 'violet' | 'ink' | 'blue' | 'orange';

export interface LocalizedText {
  readonly pt: string;
  readonly en: string;
  readonly es: string;
}

export interface Project {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly type: LocalizedText;
  readonly summary: LocalizedText;
  readonly image: string;
  readonly imageAlt: LocalizedText;
  readonly tags: readonly string[];
  readonly categories: readonly Exclude<ProjectCategory, 'all'>[];
  readonly url: string;
  readonly tone: ProjectTone;
}

export interface ExpertiseGroup {
  readonly number: string;
  readonly title: string;
  readonly technologies: string;
  readonly outcome: LocalizedText;
}

export interface ProcessStep {
  readonly number: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
}
