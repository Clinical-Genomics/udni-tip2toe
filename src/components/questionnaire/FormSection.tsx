import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { IFormSection } from '../../types';
import EditPhenotypicFeatures from './EditPhenotypicFeatures';
import NavButtons from './form/NavButtons';
import Questions from './form/Questions';
import UploadWidget from './uploads/UploadWidget';

interface IProps {
  formSection: IFormSection;
}

export default function FormSection({ formSection }: IProps) {
  const {
    title,
    description,
    questions,
    uploadSections,
    uploadGroupSections,
    ontologies,
    slug,
  } = formSection;
  return (
    <>
      <h2>{title}</h2>
      {description ? (
        <ReactMarkdown children={description}></ReactMarkdown>
      ) : null}
      {uploadSections ? (
        <div>
          {uploadSections.map((x) => (
            <div key={x}>
              <h4>{x}</h4>
              <UploadWidget section={`${slug}:${x}`} />
            </div>
          ))}
          <NavButtons />
        </div>
      ) : null}

      {uploadGroupSections ? (
        <div>
          {uploadGroupSections.map(
            (group, index) =>
              group && (
                <div
                  key={index}
                  className={'flex flex-col lg:flex-row lg:space-x-2'}
                >
                  {group.map((x) => (
                    <div className="basis-4/12" key={x}>
                      <h4>{x}</h4>
                      <UploadWidget section={`${slug}:${x}`} />
                    </div>
                  ))}
                </div>
              ),
          )}
          <NavButtons />
        </div>
      ) : null}
      <Questions questions={questions} />
      <EditPhenotypicFeatures ontologies={ontologies} slug={slug} />
    </>
  );
}
