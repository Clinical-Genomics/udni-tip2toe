import { OntologyClass } from './phenopackets/schema/v2/core/base';

export default interface SuggestedFeature {
  ontology: OntologyClass;
  section: string;
}
