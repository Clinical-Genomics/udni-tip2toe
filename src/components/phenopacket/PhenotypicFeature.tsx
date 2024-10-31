import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { PhenotypicFeature as IPhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import Ontology from './Ontology';
import tip2toeForm from '../../tip2toeform';

interface IProps {
  phenotypicFeature: IPhenotypicFeature;
}
export default function PhenotypicFeature({ phenotypicFeature }: IProps) {
  const { excluded } = phenotypicFeature;
  const slug = phenotypicFeature.description;
  const url = `/questionnaire/${slug}`;
  const title = tip2toeForm.formSections?.find((s) => s.slug === slug)?.title;
  return (
    <div
      className={
        excluded
          ? ' flex flex-col lg:flex-row my-1 lg:my-0 space-x-1 text-gray-400'
          : 'flex flex-col lg:flex-row my-1 lg:my-0 space-x-1'
      }
    >
      <NavLink to={url} className={excluded ? ' text-gray-400' : ''}>
        <p>
          {excluded ? (
            <XMarkIcon className="w-5 h-5 inline-block mr-1 text-red-500" />
          ) : (
            <CheckIcon className="w-5 h-5 inline-block mr-1 text-green-500" />
          )}
          <Ontology ontology={phenotypicFeature?.type} />
        </p>
      </NavLink>
      {phenotypicFeature?.description ? (
        <p className="text-sm flex items-end pl-5 lg:pl-0">
          {`Added in ${title}`}
        </p>
      ) : null}
    </div>
  );
}
