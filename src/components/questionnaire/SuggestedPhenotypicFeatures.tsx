import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState } from 'react';

import Ontology from '../phenopacket/Ontology';
import SuggestedFeature from '../../interfaces/suggested-feature';

interface Props {
  slug: string;
  addTerm: (term: string) => void;
}
export function SuggestedPhenotypicFeatures({ addTerm, slug }: Props) {
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [disclosureStatus, setDisclosureStatus] = useState<boolean>(false);
  const [suggestedFeatures, setSuggestedFeatures] = useState<
    SuggestedFeature[]
  >([]);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSuggestedFeatures([]);
    setPage(1);
    setPageSize(5);
    if (disclosureStatus === true) ref.current?.click();
  }, [slug]);

  useEffect(() => {
    getSuggestedFetures();
  }, [page, pageSize]);

  const getSuggestedFetures = async () => {
    try {
      const url = `${
        import.meta.env.VITE_APIURL
      }/api/v1/suggestedfeatures?section=${slug}&pageQuery=${page}&pageSizeQuery=${pageSize}`;

      const formDataRes = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const features = (await formDataRes.json()) as any[];
      setSuggestedFeatures(features);
    } catch (e) {}
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full border rounded-lg bg-white">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                ref={ref}
                onClick={() => {
                  setDisclosureStatus(!open);
                  if (!open) {
                    getSuggestedFetures();
                  }
                }}
                className="flex w-full justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-udni-teal focus:outline-none"
              >
                <span>What other suggested for this section</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-udni-teal`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-2 py-2 text-sm text-slate-500">
                <div className="flex flex-col ">
                  {suggestedFeatures &&
                    suggestedFeatures.length > 0 &&
                    suggestedFeatures.map(({ ontology }) => (
                      <div
                        key={ontology.id}
                        className="flex justify-between py-0.5 hover:text-slate-900"
                      >
                        <div>
                          <Ontology ontology={ontology}></Ontology>
                        </div>
                        <button
                          className="rounded-full bg-white"
                          onClick={() => {
                            addTerm(ontology.id);
                          }}
                          title="Add Term"
                        >
                          <PlusCircleIcon className="h-6 w-6 text-udni-teal"></PlusCircleIcon>
                        </button>
                      </div>
                    ))}
                  <div className="flex justify-between">
                    <div className="inline-flex mt-7 my-2 text-xs border rounded border-slate-300 text-slate-500">
                      <button
                        className={`${
                          pageSize === 5
                            ? 'bg-udni-teal text-white'
                            : 'hover:bg-white hover:text-gray-700'
                        } flex items-center p-2 `}
                        onClick={() => setPageSize(5)}
                      >
                        5
                      </button>
                      <button
                        className={`${
                          pageSize === 10
                            ? 'bg-udni-teal text-white'
                            : 'hover:bg-white hover:text-gray-700'
                        } flex items-center p-2 border-l `}
                        onClick={() => setPageSize(10)}
                      >
                        10
                      </button>
                      <button
                        className={`${
                          pageSize === 20
                            ? 'bg-udni-teal text-white'
                            : 'hover:bg-white hover:text-gray-700'
                        } flex items-center p-2 border-l `}
                        onClick={() => setPageSize(20)}
                      >
                        20
                      </button>
                    </div>

                    <div className="inline-flex mt-7 my-2 text-xs border rounded border-slate-300 text-slate-500 self-end">
                      {page > 1 && (
                        <button
                          className={`flex items-center p-2 border-l bg-udni-teal text-white`}
                          onClick={() => setPage(page - 1)}
                        >
                          Previous
                        </button>
                      )}
                      {suggestedFeatures?.length > 0 && (
                        <button
                          className={`flex items-center p-2 border-l bg-udni-teal text-white`}
                          onClick={() => setPage(page + 1)}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
