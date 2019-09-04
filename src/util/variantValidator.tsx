import _ from 'lodash';

export enum VALIDATION_MESSAGE {
    VALID = "This variant is valid",
    NOT_VALID = "This variant is not valid"
}

export enum VARIANT_OPERATOR {
    SNP = ">",
    INS = "ins",
    DEL = "del",
    DELINS = "delins"
}

export type VariantValidStatus = {
    isValid: boolean,
    message: VALIDATION_MESSAGE
}

export function isVariantValid(variant:string):VariantValidStatus {
    // check if the variant is using genomic location representation
    // is using genomic location representation
    if (variant.split(',').length > 1) {
        // TODO: add check for genomic location
    }
    // is using hgvs representation
    else {
        // SNP
        if (variant.includes(VARIANT_OPERATOR.SNP)) {
            var pattern = /\b([1-9]|1[0-9]|2[0-4])\b(:g.)[0-9]*[A|T|G|C]>[A|T|G|C]/i;
            if (variant.match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }
        // DELINS
        else if (variant.includes(VARIANT_OPERATOR.DELINS)) {
            var pattern = /\b([1-9]|1[0-9]|2[0-4])\b(:g.)[0-9]*_?[0-9]*/i;
            var pattern = /\b([1-9]|1[0-9]|2[0-4])\b(:g.)[0-9]*[A|T|G|C]>[A|T|G|C]/i;
            if (variant.match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }

        }
        // INS
        else if (variant.includes(VARIANT_OPERATOR.INS)) {

        }
        // DEL
        else if (variant.includes(VARIANT_OPERATOR.DEL)) {

        }
    }
    return {"isValid":false, "message":VALIDATION_MESSAGE.NOT_VALID} as VariantValidStatus;
}

