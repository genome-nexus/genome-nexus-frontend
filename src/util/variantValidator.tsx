import _ from 'lodash';
import { Alert, Button } from 'react-bootstrap';
import { useState } from 'react';

export enum VALIDATION_MESSAGE {
    VALID = "This variant is valid",
    NOT_VALID = "This variant is not valid"
}

export enum VARIANT_OPERATOR {
    SNP = ">",
    INS = "ins",
    DEL = "del",
    DELINS = "delins",
    DUP = "dup"
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
        // INVALID
        if (variant.includes("N" || "-" || "undefined" || "g.0")) {
            return {"isValid":false, "message":VALIDATION_MESSAGE.NOT_VALID} as VariantValidStatus;
        }

        // SNP
        if (variant.includes(VARIANT_OPERATOR.SNP)) {
            // chromosome(1-24,X,Y,MT) + start(number) + ref(A/T/G/C) + ">" + var(A/T/G/C)
            var pattern = /\b([1-9]|1[0-9]|2[0-4]|[XY]|(MT))\b(:g.)[0-9]*[ATGC]>[ATGC]/i;
            if (variant.trim().match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }

        // DELINS
        else if (variant.includes(VARIANT_OPERATOR.DELINS)) {
            // chromosome(1-24,X,Y,MT) + start(number) + "_" + end(number) + "delins" + var(ATGC)
            var pattern = /\b([1-9]|1[0-9]|2[0-4]|[XY]|(MT))\b(:g.)[0-9]*_[0-9]*(delins)[ATGC]*/i;
            if (variant.trim().match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }

        // INS
        else if (variant.includes(VARIANT_OPERATOR.INS)) {
            // chromosome(1-24,X,Y,MT) + start(number) + "_" + end(number) + "ins" + var(ATGC)
            var pattern = /\b([1-9]|1[0-9]|2[0-4]|[XY]|(MT))\b(:g.)[0-9]*_[0-9]*(ins)[ATGC]*/i;
            if (variant.trim().match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }

        // DEL
        else if (variant.includes(VARIANT_OPERATOR.DEL)) {
            var pattern = /\b([1-9]|1[0-9]|2[0-4]|[XY]|(MT))\b(:g.)[0-9]*_[0-9]*(del)/i;
            if (variant.trim().match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }

        // DUP
        else if (variant.includes(VARIANT_OPERATOR.DUP)) {
            var pattern = /\b([1-9]|1[0-9]|2[0-4]|[XY]|(MT))\b(:g.)[0-9]*_[0-9]*(dup)/i;
            if (variant.trim().match(pattern)) {
                return {"isValid":true, "message":VALIDATION_MESSAGE.VALID} as VariantValidStatus;
            }
        }

        else {
            return {"isValid":false, "message":VALIDATION_MESSAGE.NOT_VALID} as VariantValidStatus;
        }
    }
    return {"isValid":false, "message":VALIDATION_MESSAGE.NOT_VALID} as VariantValidStatus;
}

