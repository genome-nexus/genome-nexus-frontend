import _ from 'lodash';

export function normalizeSearchText(keyword: string) {
    // convert search text to upper case
    if (
        /:|\s/i.test(keyword) &&
        (keyword.split(':').length - 1 === 1 ||
            keyword.split(' ').length - 1 === 1)
    ) {
        const separator = /:/i.test(keyword) ? ':' : ' ';
        const seperatorIndex = keyword.indexOf(separator);
        let firstPart = keyword.split(separator)[0];
        let secondPart = keyword.split(separator)[1];
        let type = '';
        // if search text contains "p." / "c." / "g.", extract it out (type needs to be in lower case)
        // ":" should not be start or end of search text
        if (
            seperatorIndex > 0 &&
            seperatorIndex < keyword.length - 3 &&
            keyword.match(/[pcg]\./g)?.length === 1
        ) {
            firstPart = keyword.slice(0, seperatorIndex);
            secondPart = keyword.slice(seperatorIndex + 3, keyword.length);
            type = keyword.slice(seperatorIndex + 1, seperatorIndex + 3);
        }
        // if "del"/"ins"/"dup" in text(it should be in second part of text after splitting by ":"), don't convert second part to upper case
        // otherwire convert all to upper case except type
        const match = secondPart.match(/del|dup|ins/g);
        if (match?.length === 1) {
            const alternationType = match[0];
            const location = secondPart.split(alternationType)[0];
            const alleles = secondPart.split(alternationType)[1];
            keyword = `${_.toUpper(firstPart)}${separator}${type}${_.toUpper(
                location
            )}${alternationType}${_.toUpper(alleles)}`;
        }
        // if "delins" in text, convert other parts to uppercase
        else if (match?.length === 2 && /delins/g.test(secondPart)) {
            const alternationType = 'delins';
            const location = secondPart.split(alternationType)[0];
            const alleles = secondPart.split(alternationType)[1];
            keyword = `${_.toUpper(firstPart)}${separator}${type}${_.toUpper(
                location
            )}${alternationType}${_.toUpper(alleles)}`;
        } else {
            keyword = `${_.toUpper(firstPart)}${separator}${type}${_.toUpper(
                secondPart
            )}`;
        }
    }

    return keyword;
}

export function isValidInput(keyword: string) {
    // input should have whitespace or ":" in between or start with "rs"
    if (/\s|:/i.test(keyword) || keyword.startsWith('rs')) {
        return true;
    } else {
        return false;
    }
}

export function isSearchingByRsid(keyword: string) {
    // input should start with "rs"
    return keyword.startsWith('rs');
}

export function isSearchingByHgvsg(keyword: string) {
    // input should contain ":g."
    return /:g./i.test(keyword);
}

export function normalizeInputFormatForDatabaseSearch(keyword: string) {
    keyword = normalizeSearchText(keyword);
    // if input contains whitespace, convert to correct format
    if (/\s/i.test(keyword)) {
        const gene = keyword.split(' ')[0];
        const proteinChange = keyword.split(' ')[1];
        // if input contains "c." or "p.", extract type and generate query. If no "c." or "p.", add "p." into query string.
        // whitespace should be replaced to ":"
        if (/[cp]\./i.test(proteinChange)) {
            keyword = `${gene} ${proteinChange.split('.')[0]}.${
                proteinChange.split('.')[1]
            }`;
        } else {
            keyword = `${gene} p.${proteinChange}`;
        }
    }
    // if contains ":", repalce to whitespace
    else if (/:p|:c/i.test(keyword)) {
        if (!/EN/i.test(keyword)) {
            keyword = `${keyword.split(':')[0]} ${keyword.split(':')[1]}`;
        }
    }
    return keyword;
}

export function normalizeInputFormatForOutsideSearch(keyword: string) {
    keyword = normalizeSearchText(keyword);
    // if input contains whitespace, convert to correct format
    if (/\s/i.test(keyword)) {
        let gene = keyword.split(' ')[0];
        let proteinChange = keyword.split(' ')[1];
        // if input contains "c." or "p.", extract type and generate query. If no "c." or "p.", add "p." into query string.
        // whitespace should be replaced to ":"
        if (/[cp]\./i.test(proteinChange)) {
            keyword = `${gene}:${proteinChange.split('.')[0]}.${
                proteinChange.split('.')[1]
            }`;
        } else {
            keyword = `${gene}:p.${proteinChange}`;
        }
    }
    return keyword;
}

export function extractHgvsg(fullHgvsg: string) {
    const splitedHgvsg = fullHgvsg.split(':');
    let optionValue = undefined;
    if (splitedHgvsg.length === 2 && splitedHgvsg[0].startsWith('NC_')) {
        // if chromosome is 1-9, keep the last character, if chromosome is 10-24, keep two charaters
        const chromosome =
            splitedHgvsg[0]
                .split('.')[0]
                .charAt(splitedHgvsg[0].split('.')[0].length - 2) === '0'
                ? splitedHgvsg[0].split('.')[0].slice(-1)
                : splitedHgvsg[0].split('.')[0].slice(-2);
        if (splitedHgvsg[1].charAt(0) === 'g') {
            optionValue = chromosome + ':' + splitedHgvsg[1];
        }
    }
    return optionValue;
}
