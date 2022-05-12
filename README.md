# Genome-Nexus Frontend

### Genome Build
Genome Nexus supports both GRCh37 and GRCh38, by default Genome Nexus website will use the public GRCh37 Genome Nexus API.

#### GRCh38
To use GRCh38 Genome Nexus API, uncomment `REACT_APP_GENOME_NEXUS_URL=https://grch38.genomenexus.org` and comment `REACT_APP_GENOME_NEXUS_URL=https://www.genomenexus.org` in the `.env` file.

### Query examples
- 7:g.55249071C>T (showing sensitive and resistant on Therapeutic Implication)
- 1:g.115256529T>C (long name on Therapeutic Implication)  
- 17:g.41226411G>A (showing sensitive with multi levels on Therapeutic Implication)
- 3:g.178952152_178952162del (protein change differs in genome nexus(`*1069*`), oncokb(`*1069F`), cbioportal(`*1069fs*`))

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run
When using `nvm` and `yvm`:
```bash
echo load genome nexus frontend env && nvm use 15.2.1 && yvm use 1.22.5 && yarn && yarn run start
```
