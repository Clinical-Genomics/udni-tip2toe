import { TermResponse } from '../hpoJax';

interface IResult {
  term?: string;
  label?: string;
  error?: string;
}
async function lookupHpoTerm(term: string): Promise<IResult> {
  const ret = await fetch(
    `https://ontology.jax.org/api/hp/terms/${encodeURI(term)}`,
  );
  if (ret.ok) {
    const res = (await ret.json()) as TermResponse;
    return { term, label: res.details.name };
  } else {
    return { error: 'Unknown HPO term' };
  }
}

export interface IJaxTerm {
  name: string;
  id: string;
  childrenCount: number;
  ontologyId: string;
  synonym?: string;
}
export interface TermsResponse {
  error?: string;
  terms?: IJaxTerm[];
}

async function searchHpoTerms(query: string): Promise<TermsResponse> {
  const ret = await fetch(
    `https://ontology.jax.org/api/hp/search?q=${encodeURI(
      query,
    )}&max=10&offset=0&category=terms`,
  );
  if (ret.ok) {
    const res = (await ret.json()) as TermsResponse;
    return res;
  } else {
    return { error: 'Unknown HPO term' };
  }
}

export { lookupHpoTerm, searchHpoTerms };
