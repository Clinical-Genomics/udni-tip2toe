import PhenotypicFeaturesList from './summary/PhenotypicFeaturesList';
import tip2toeForm from '../../tip2toeform';
import ViewFormSection from './summary/ViewFormSection';
import ViewIndividual from './ViewIndividual';
import ViewPhotographs from './uploads/ViewPhotographs';
import { Phenopacket } from '../../interfaces/phenopackets/schema/v2/phenopackets';
import { ICustomFormData } from '../../types';
import { useState } from 'react';

interface IProps {
  phenoPacket: Partial<Phenopacket>;
  customFormData?: ICustomFormData;
}
export default function Summary({ phenoPacket, customFormData }: IProps) {
  const [type, setType] = useState<'all' | 'normal' | 'abnormal'>('abnormal');
  return (
    <article className="summary divide-y space-y-4">
      <ViewPhotographs
        files={phenoPacket?.files?.filter((x) =>
          x.fileAttributes['section'].startsWith('photographs'),
        )}
      />
      <ViewFormSection
        slug="this-is-me"
        customFormData={customFormData || {}}
        phenoPacket={phenoPacket}
      />
      {phenoPacket.subject ? (
        <ViewIndividual
          individual={phenoPacket.subject}
          customFormData={customFormData}
        />
      ) : null}
      <ViewFormSection
        slug="clinical-findings"
        customFormData={customFormData || {}}
        phenoPacket={phenoPacket}
      />
      <section className="my-4">
        <div className="flex justify-between">
          <h3>Phenotypic features</h3>
          <div className="inline-flex my-2 text-xs border rounded border-slate-300 text-slate-500">
            <button
              className={`${
                type === 'normal'
                  ? 'bg-udni-teal text-white'
                  : 'hover:bg-white hover:text-gray-700'
              } flex items-center p-2 `}
              onClick={() => setType('normal')}
            >
              Normal
            </button>
            <button
              className={`${
                type === 'abnormal'
                  ? 'bg-udni-teal text-white'
                  : 'hover:bg-white hover:text-gray-700'
              } flex items-center p-2 border-l `}
              onClick={() => setType('abnormal')}
            >
              Abnormal
            </button>
            <button
              className={`${
                type === 'all'
                  ? 'bg-udni-teal text-white'
                  : 'hover:bg-white hover:text-gray-700'
              } flex items-center p-2 border-l `}
              onClick={() => setType('all')}
            >
              All
            </button>
          </div>
        </div>
        {(type === 'all' || type === 'abnormal') && (
          <PhenotypicFeaturesList
            phenotypicFeatures={phenoPacket.phenotypicFeatures?.filter(
              (x) => !x.excluded,
            )}
          />
        )}
        {(type === 'all' || type === 'normal') && (
          <PhenotypicFeaturesList
            phenotypicFeatures={phenoPacket.phenotypicFeatures?.filter(
              (x) => x.excluded,
            )}
          />
        )}
      </section>

      {tip2toeForm.formSections
        ?.filter(
          (x) =>
            (x.questions?.length || x.uploadSections?.length) &&
            x.slug !== 'photographs' &&
            x.slug !== 'clinical-findings' &&
            x.slug !== 'this-is-me',
        )
        .map((formSection) => {
          return (
            <ViewFormSection
              formSection={formSection}
              key={formSection.slug}
              customFormData={customFormData || {}}
              phenoPacket={phenoPacket}
            />
          );
        })}
    </article>
  );
}
