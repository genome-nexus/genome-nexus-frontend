## Dec 16, 2021

-   **API Update**: New search endpoint to search Genome Nexus database.
    -   For example, search [BRAF p.V600E](https://www.genomenexus.org/search?keyword=BRAF%20p.V600E)

## Nov 04, 2021

-   **Website New Feature**: Add UniProt topology track to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148010730-e3d7463b-1cec-4b78-a0bc-2a7e7d8f65eb.png" />

## Sep 30, 2021

-   **Website New Feature**: Add exon track to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148010884-4ed57f8e-cb7b-4357-84b0-1a678a907f8d.png" />

## Sep 02, 2021

-   **Website New Feature**: Add [SIGNAL](https://www.signaldb.org/) to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148010990-431f5dc8-fec0-4d92-bfda-1d8039b88158.png" />

## Aug 18, 2021

-   **Website New Feature**: Add CIViC to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148011094-b9e51146-5e39-4730-b23f-d770036cd4b5.png" />

## Jun 10, 2021

-   **Website New Feature**: Add ClinVar to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148011187-29836206-5ddd-41ee-baee-15a00641b11e.png" />

## Apr 12, 2021

-   **API Update**: Support fetching UniProt id from annotation summary.
    -   [Example: 17:g.41242962_41242963insGA](https://www.genomenexus.org/annotation/17%3Ag.41242962_41242963insGA?fields=annotation_summary)

## Mar 22,2021

-   **API Update**: Fetch ClinVar annotation from annotation endpoints.
    -   [Example: 13:g.32890665G>A](https://www.genomenexus.org/annotation/13%3Ag.32890665G%3EA?fields=clinvar)

## Feb 11,2021

-   **Annotation Pipeline Update**: Add Ref_Tri and Var_Tri columns to annotation output.

## Jan 11,2021

-   **Annotation Pipeline Update**: Add exon number column to annotation output.

## Oct 26, 2020

-   **API Update**: Add [SIGNAL](https://www.signaldb.org/) mutation search endpoint.
    -   For example, search [BRAF V600](https://www.genomenexus.org/signal/search?keyword=BRAF%20V600)

## Sep 24, 2020

-   **API Update**: Support additional functional impact columns - add sift/polyphen output to transcript consequence summary.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/annotation/7%3Ag.55249071C%3ET?fields=annotation_summary)
-   **Annotation Pipeline Update**: Support POLYPHEN, SIFT annotations in output annotated MAF.

## May 21, 2020

-   **API Update**: Add [SIGNAL](https://www.signaldb.org/) annotation field for annotation endpoint.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/annotation/7%3Ag.55249071C%3ET?fields=signal)

## May 21, 2020

-   **Website New Feature**: Support transcript switch on variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148014139-1974e152-edf1-4d95-9dd7-2ad52167e954.png" />

## Mar 25, 2020

-   **API Update**: Add nucleotide context endpoints.
    -   [Example: 7:g.140453136A>T](https://www.genomenexus.org/nucleotide_context/7%3Ag.140453136A%3ET)

## Mar 05, 2020

-   **API Update**: Add amino acids to annotation summary.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/annotation/7:g.55249071C%3ET?fields=annotation_summary)

## Mar 03, 2019

-   **Command Line Interface Update**: Add OncoKB annotation to output annotation MAF file.

## Feb 04, 2020

-   **API Update**: Add [OncoKB](https://www.oncokb.org/) to annotation endpoints.
    -   Please get your license from [OncoKB](https://www.oncokb.org/) first and paste your `token` to API.

## Jan 23, 2020

-   **Updates**: Integrated in [cBioPortal](https://www.cbioportal.org/). 
    -   Click [example query](https://www.cbioportal.org/results/mutations?cancer_study_list=ov_tcga_pub&cancer_study_id=ov_tcga_pub&genetic_profile_ids_PROFILE_MUTATION_EXTENDED=ov_tcga_pub_mutations&Z_SCORE_THRESHOLD=2.0&case_set_id=ov_tcga_pub_3way_complete&gene_list=BRCA1+BRCA2&gene_set_choice=user-defined-list), click `Columns` button and add `HGVSg` to the table. Every HGVSg link goes to corresponding Genome Nexus variant page.

## Dec 10, 2019

-   **Website New Feature**: Add [OncoKB](https://www.oncokb.org/) to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148015041-92655b1f-a9c3-40d4-9c19-036ca7c1df89.png" />

## Dec 03, 2019

-   **Website New Feature**: Add Functional prediction and Population prevalence to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148015515-2fe48e0b-da87-4406-a46e-d877bf524bcb.png" />

## Oct 18, 2019

-   **Command Line Interface Update**: Command line interface for Genome Nexus annotation and convertion.
    -   For more information, see [genome-nexus-cli](https://github.com/genome-nexus/genome-nexus-cli)

## Sep 18, 2019

-   **Website New Feature**: Add mutation mapper lollipop to variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148015718-c0cfe2bb-dc6a-4a7d-b4b6-71a65e3e635a.png" />

## Sep 18, 2019

-   **Website New Feature**: Add variant page.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
        <img src="https://user-images.githubusercontent.com/16869603/148015822-887a52f4-bfa3-4ae9-b00d-7e27aff90bd3.png" />

## Aug 15, 2019

-   **API Update**: Add an API endpoint for MSK Insight (SIGNAL) mutations.
    -   [Example: BRCA1](https://www.genomenexus.org/signal/mutation?hugoGeneSymbol=BRCA1)

## May 08, 2019

-   **API Update**: Add gnomad data to my-variant-info endpoints.
    -   [Example: 7:g.140453136A>T](https://www.genomenexus.org/my_variant_info/variant/7%3Ag.140453136A%3ET)
-   **API Update**: Add intergenic_consequences to annotation.
    -   [Example: 12:g.43130986C>G](https://www.genomenexus.org/annotation/12%3Ag.43130986C%3EG)

## Mar 12, 2019

-   **API Update**: Add PTM endpoints.
    -   [Example: ENST00000646891](https://www.genomenexus.org/ptm/experimental?ensemblTranscriptId=ENST00000646891)

## Jan 30, 2019

-   **API Update**: Add exon number for annotation and summary endpoints.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/annotation/7:g.55249071C%3ET?fields=annotation_summary)
-   **API Update**: Support query Hotspots by transcript id and protein location.
    -   [Example: ENST00000288602](https://www.genomenexus.org/cancer_hotspots/transcript/ENST00000288602)
