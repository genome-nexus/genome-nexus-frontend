import * as React from 'react';
//import { useTable } from 'react-table';
import { default as JsonData } from '../data/CuriousCasesList.json';

import JsonDataDisplay from '../page/REVUETable';
function App() {
    return (
        <div
            className="App"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <h1>
                reVUE: Repository for Variants with Unexpected Effects {'\n'}{' '}
            </h1>

            <p>
                {' '}
                {'\n'} Clinical sequencing of tumor samples has emerged as a
                component of routine cancer care. By identifying genomic
                alterations that contribute to tumor initiation or progression,
                clinical sequencing may be used to identify predictive
                biomarkers of drug response, refine patient cancer diagnoses,
                assess heritable cancer risk, or inform patient prognosis. Most
                genomic alterations are accurately annotated with tools such as
                the Variant Effect Predictor (VEP) 1 that infer their effects on
                the mRNA and protein by following basic rules of transcription,
                mRNA post-transcriptional processing, and translation. For
                example, most single nucleotide changes in coding regions of the
                DNA lead to missense mutations, nonsense mutations, frameshift
                insertions or deletions at the protein level, which may
                hyperactivate or inactivate the protein. However, some genomic
                variants are not as easily captured by these rules, which can
                cause inappropriate or unclear annotation of the protein effect.
                For example, a variant that alters an existing splice site or
                creates a new one can inactivate or activate the protein. and,
                similarly, specific mutations in the non-coding promoter region
                of a gene may de-regulate gene expression. Collectively, we term
                these variants “variants with unexpected effects (VUE)”. While
                many of these are functionally characterized and documented in
                the literature, there is currently no centralized database that
                identifies, curates and programmatically stores these events,
                enabling their annotation during routine clinical cancer genomic
                sequencing. Certain VUEs may have therapeutic implications,
                which, if mis-annotated may lead to suboptimal treatment
                decisions for individual patients with cancer. For example,
                in-frame KIT exon 11 deletions are recurrent in patients with
                gastrointestinal stromal tumors (GIST) and are biomarkers for
                the use of imatinib as first-line therapy. About 2-3% of GIST
                tumors harbor KIT exon 11 deletions that extend into the
                non-coding intron between exons 10 and 11. Although these events
                have been shown to cause in-frame deletions, they are typically
                misclassified as inactivating splice site mutations, precluding
                patients carrying these mutations from receiving standard care
                imatinib. To address this unmet clinical need, we propose to
                build a novel bioinformatic application, REVUE, a REpository for
                Variants with Unexpected Effect. The application will curate and
                store all VUE relevant information, be freely accessible via an
                intuitive website and through an application programming
                interface (API), and will accept feedback and submission of new
                VUEs from the cancer genomics community. It will be an important
                resource for clinical bioinformatic pipelines to accurately
                annotate all DNA mutations, with important implications for the
                subset of patients with cancers harboring VUEs. {'\n'}
            </p>
            <JsonDataDisplay />
        </div>
    );
}

export default App;
// class Revue extends React.Component<{}> {
//     public render() {
//         return (
//             <React.Fragment>
//                 <p>REVUE page is under construction.</p>
//             </React.Fragment>
//         );
//     }
// }

// class Revue extends React.Component<{}> {
//     public render() {
//         return (
//             function JsonDataDisplay() {
//                 const DisplayData = JsonData.map((info) => {
//                     return (
//                         <tr>
//                             <td>{info.hugoGeneSymbol}</td>
//                             <td>{info.genomicLocation}</td>
//                             <td>{info.comment}</td>
//                         </tr>
//                     );
//                 });

//                 return (
//                     <div>
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Gene</th>
//                                     <th>Genomic Location</th>
//                                     <th>Comment</th>
//                                 </tr>
//                             </thead>
//                             <tbody>{DisplayData}</tbody>
//                         </table>
//                     </div>
//                 );
//             }
//         )
//     }
// }
//export default Revue;
//export default JsonDataDisplay;
