export interface TermResponse {
  name: string;
  id: string;
  definition: string;
  comment: string;
  synonyms: string[];
  xrefs?: string[];
  descendantCount?: number;
}
