## Dec 18, 2025
**Website New Feature**  
Mutation Assessor V4 multiple sequence alignment files are now directly accessible from the variant page. Click `View` or `Download` under the `Mutation Assessor` section to explore the alignment files.
<img src="https://github.com/user-attachments/assets/dc8f1d08-586f-40f9-9690-34181bada7d2" />

## Nov 25, 2025
**Database Update**  
Slim version database images are now available for all future releases. Slim version database images only includes the necessary components for running the Genome Nexus service, such as Ensembl related files and HGNC list, no external connections to other data sources. Users who only need to run the Genome Nexus service for basic variant annotation or need to run the service in a restricted environment can looking for image tag `slim`.

## Nov 5, 2025  
**Data Update**  
New canonical transcripts for CDKN2A mskcc isoform are:
- ENST00000579755.1 (p14) - MANE plus clinical p14, this is also Germline transcript
- ENST00000304494.5 (p16) - p16 MANE

## Nov 5, 2025
**Database Update**
Genome Nexus database v1.0 is now available. Starting from version v1.0, ensembl 111 will be the default for grch37.

## Nov 5, 2025
**API Update**  
Transcript subversion information is now supported! Look for `transcriptSubversion` field in the API response, this will be supported on hotspots endpoints and ensembl endpoints.

## Oct 29, 2025
**Data Update**
MSKCC isoform for grch37 is updated! Checkout the isoform file [here](https://github.com/genome-nexus/genome-nexus-importer/blob/master/data/common_input/isoform_overrides_at_mskcc_grch37.txt).
In this new mskcc isoform, the default transcripts for each gene were updated to align better with OncoKB, prioritizing clinically relevant and MANE transcripts (Morales et al. 2022). Also Ensembl's subversions are now included for each transcript.

## Oct 23, 2025  
**Annotation Pipeline Update**  
A configurable option for replacing gene symbols with Entrez identifiers has been restored in the annotation pipeline. 
By default this parameter is set to "true".
Usage example:
- no  `--replace-symbol-entrez` provided in command: 
  - replace symbols and Entrez ID to what in annotator
- `--replace-symbol-entrez true` provided in command:
  - replace symbols and Entrez ID to what in annotator
- `--replace-symbol-entrez false` provided in command:
  - use symbols and Entrez ID from input file

## Jul 16, 2025 
**Annotation Pipeline Update**  
Improved Memory Usage for Large Annotation Jobs: the annotation pipeline now can handle large MAF files or cohort-level datasets.  

## Apr 16, 2025
**Genome Nexus Update**
Genome Nexus now always returns the latest HGNC symbols. For examples, `FAM58A` will be changed to `CCNQ`.

## Mar 11, 2025
**API Update**  
Genome Nexus v2.0.0 Breaking Changes ⚠️
Please notice that `gn_vep.region.url`, `gn_vep.server.version`, and `gn_vep.cache.version` from application properties are removed.
Genome Nexus VEP **<2.0.0** no longer supported, see Docker Hub, and use tags labeled `{VEP_VERSION}-2.0.0` or greater.
Please see release notes for more details: https://github.com/genome-nexus/genome-nexus/releases/tag/v2.0.0

## Mar 7, 2025  
**Genome Nexus VEP**  
The Genome Nexus VEP service now supports MySQL database-backed annotation workflows. Error reporting was also improved to better align with upstream VEP output.  

## Feb 11, 2025
**Genome Nexus Improvements**
2 new configurations added to Genome Nexus application.properties:
- `cache.enabled`: Enables or disables caching for annotation sources such as vep.annotation, index, my_variant_info.annotation.
  - Default value: true
  - When set to false, queries bypass the cache and make direct calls to the web service, not saving any data to the database.
- `prioritize_cancer_gene_transcripts`: prioritize OncoKB genes when picking canonical transcript. 
  - Default value: true.
  - If users prefer to not include this prioritizer, it can be disabled in the application.properties.

## Jan 21, 2025
**Database Update**
- Update HGNC to version 2024-10
- Update ClinVar to version 20250106

## Oct 10, 2024
**Annotation Pipeline Update**  
Support for Mutation Assessor v4 output was added to the annotation pipeline. Removed columns that are not available in new version, add three new columns: `MSA`, `MAV`, `SV`.

## Oct 11, 2024
**Annotation Pipeline Update**  
Improved Annotation of Intergenic Variants: Intergenic variants are now annotated with `intergenic_variant` in `Consequence` column, and `IGV` in `Variant_Classification` column.

## Aug 21, 2024
**Database Update**
Mutation Assessor v4 data is now supported.

## Jun 22, 2024
**Data Update**
AlphaMissense are now available in Genome Nexus API response. Looking for `alphaMissense` field in any of the following fields: `transcript_consequences`, `transcriptConsequences`, `transcriptConsequenceSummaries`, `transcriptConsequenceSummary`.  

## Jan 3, 2024
**Database Update**
Update HGNC symbol to version 2023.10.

## Jan 2, 2024
**Genome Nexus Update**
Consequence terms and variant classification terms are updated to align with Ensembl (https://useast.ensembl.org/info/genome/variation/prediction/predicted_data.html).

## Oct 11, 2023
**Genome Nexus Update**  
Genome Nexus now supports `N` allele when giving a HGVsg or genomic variants.

## Sep 25, 2023
**Annotation Pipeline Update**
Add a new new parameter `-n` to annotation pipeline. 
`-n` will add "genomic_location_explanation" column to output file. Only variants that have altered genomic location will have value in this column
example column value: End position changes from 170837525 to 170837526, end position should equal to start position for SNV variants

## Aug 8, 2023
- **Annotation Pipeline Update**: Add support for [OncoKB™](https://www.oncokb.org/) annotation in annotation pipeline
    - OncoKB™ annotation access requires token. See [document](https://github.com/genome-nexus/genome-nexus-annotation-pipeline#annotation-fields) about how to add OncoKB™ annotation in MAF.
- **Annotation Pipeline Update**: Release v1.0.0!

## Aug 4, 2023
- **Database Update**: Update ClinVar version to 20230722

## Jul 31, 2023:
- **Annotation Pipeline Update**: Add version as subcommand 
    - Example:
        ```
        $ java -jar annotationPipeline/target/annotationPipeline-*.jar version
        ```

## May 30, 2023
- **Database Update**:
    - New HGNC symbols, version: 2024.4.01
    - Update both GRCh37 and GRCh38.

## Apr 24, 2023
- **Annotation Tool Update**: New python tool to convert vcf to maf file. See [documents](https://github.com/genome-nexus/annotation-tools).
    - annotation_wrapper_suite.sh: This suite of tools was designed with the AACR Project GENIE
      - Example:
        ```
        ./annotation_suite_wrapper.sh --input-directory=/data/vcfs/ --output-directory=/data/maf/ --merged-mutation-file=/data/merged.maf --center-name=CTR --sequence-source=WGS --annotation-scripts-home=$(pwd)
        ```
    - VCF to MAF Conversion Tool: `vcf2maf.py` can be used as a standalone tool to convert a VCF file to a Mutation Annotation Format (MAF) file.
      - Example:
        ```
        python3 vcf2maf.py --input-data /data/vcfs --output-directory /data/maf/ --center-name CTR --sequence-source WGS --tumor-id Tumor --normal-id Normal
        ```

## Jan 30, 2023
- **API Update**:
    - Integrating list of VUEs from [www.cancerrevue.org](www.cancerrevue.org) into the backend server of Genome Nexus. Now confirmed VUEs will overwrite annotations in `annotation_summary`.

## Dec 13, 2022
- **Database Update**:
    - New HGNC symbols, version: 2022.10.01
    - Update both GRCh37 and GRCh38.

## Dec 12, 2022
- **Annotation Pipeline Update**: Support not removing matching bases and sticking with original input (see [document](**Annotation Pipeline Update**))

## Sep 21, 2022
- **Database Update**: Support "Mutation Assessor" in annotation API
    - When query annotations, add `mutation_assessor` in `fields`
    - [Example: 7,140453136,140453136,A,T](https://www.genomenexus.org/annotation/genomic/7%2C140453136%2C140453136%2CA%2CT?fields=mutation_assessor)
    - Mutation Assessor data version: v3

## Sep 14, 2022
- **Database Update**: 
    - Cancer hotspots update: GRCh38_ensembl95 Cancer Hotspots data has been updated with the latest transcripts
    - Canonical transcript update: GRCh38_ensembl95 canonical transcript has been updated 

## Aug 29, 2022
-  **Annotation Pipeline Update**: Now Genome Nexus annotation pipeline shows response time to the summary.
    - ```
        Average Response Time:  1.000 sec.
        Total Response Time:  1 sec.
        Total Run Time:  2 sec.`
       ```

## Aug 16, 2022
-  **Annotation Pipeline Update**: Support Subcommands annotate and merge.
    - This tool has two subcommands: annotate, merge
    Help page can be displayed by:
        ```
        java -jar gnap.jar -h
        ```
    - Subcommand - annotate: 
    Allows the annotation of genomic variants from a MAF file using [Genome Nexus](http://genomenexus.org). Help page can be displayed by: 
        ```
        java -jar gnap.jar annotate -h
        ```
    - Subcommand - merge:
    Merges given MAF files or given directory which contains MAF files, into a single MAF file.
    Help page can be displayed by:
        ```
        java -jar gnap.jar merge -h
        ```

## Aug 12, 2022
- **API Update**: Version support
    - New `version` API that supports versioning for Genome Nexus (server/codebase and mongo) and VEP (server/codebase and cache)
    - Please check out here: https://www.genomenexus.org/swagger-ui.html#!/info45controller/fetchVersionGET

## Aug 09, 2022,
-   **Annotation Pipeline Update**: Support Customize output file format.
    - There are lots of empty columns in the output file. You will be able to use option-format option to supply an output format. As an example, you can create a file with the following line:
        ```
        Hugo_Symbol,Entrez_Gene_Id,Center,NCBI_Build,Chromosome
        ```
    - The application will only output these columns + any other column/s required by the application. Order is preserved.
    - Currently, it only supports commas as the separator.

## Jul 20, 2022
- **Website New Feature**: Add a possibility to use local vep for hotspots endpoint
    - Set `gn_vep.region.url` to your local VEP service

## Jun 02, 2022
- **Genome Nexus VEP**:
    - Genome Nexus VEP image is available on docker.
    - https://hub.docker.com/r/genomenexus/genome-nexus-vep

## Apr 11, 2022
- **Website New Feature**: Genome Nexus now fits in small screen too! Check out on your phone: [www.genomenexus.org](https://www.genomenexus.org/)

## Feb 17, 2022
- **Website New Feature**: Show information about curious cases on variant page. This feature is still in beta, need to manually add `curious` in URL. 
    -   [Example: 4:g.55593580A>T](https://deploy-preview-119--genome-nexus-frontend.netlify.app/variant/4:g.55593580A%3ET?curious)
    <img src="https://user-images.githubusercontent.com/16869603/153139930-81ef5fb3-00a0-4141-a0ba-13145cd401b2.png" />

## Feb 11, 2022
- **Publication**
    - When using Genome Nexus, please cite [de Bruijn et al., JCO CCI 2022](https://ascopubs.org/doi/abs/10.1200/CCI.21.00144).
    - Genome Nexus aggregates variant annotation from various sources. See this [documentation](https://docs.genomenexus.org/annotation-sources#annotation-sources%F0%9F%97%84%EF%B8%8F) for all supported annotation sources. Remember to also cite the underlying annotation sources you are using.

## Feb 01, 2022
- **Website New Feature**: Show both somatic and germline frequency for SIGNAL.
    -   [Example: 7:g.55249071C>T](https://www.genomenexus.org/variant/7:g.55249071C%3ET)
    <img src="https://user-images.githubusercontent.com/16869603/151427238-7d41070b-e822-4a53-aa29-fed5c91334f7.png" />

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

-   **Command Line Interface Update**: Add OncoKB™ annotation to output annotation MAF file.

## Feb 04, 2020

-   **API Update**: Add [OncoKB™](https://www.oncokb.org/) to annotation endpoints.
    -   Please get your license from [OncoKB™](https://www.oncokb.org/) first and paste your `token` to API.

## Jan 23, 2020

-   **Updates**: Integrated in [cBioPortal](https://www.cbioportal.org/). 
    -   Click [example query](https://www.cbioportal.org/results/mutations?cancer_study_list=ov_tcga_pub&cancer_study_id=ov_tcga_pub&genetic_profile_ids_PROFILE_MUTATION_EXTENDED=ov_tcga_pub_mutations&Z_SCORE_THRESHOLD=2.0&case_set_id=ov_tcga_pub_3way_complete&gene_list=BRCA1+BRCA2&gene_set_choice=user-defined-list), click `Columns` button and add `HGVSg` to the table. Every HGVSg link goes to corresponding Genome Nexus variant page.

## Dec 10, 2019

-   **Website New Feature**: Add [OncoKB™](https://www.oncokb.org/) to variant page.
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
