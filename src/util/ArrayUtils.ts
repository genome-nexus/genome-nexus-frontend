import _ from 'lodash';

export function toggleIncluded<T>(elt: T, included: T[]): T[] {
    let toggled = _.without(included, elt);

    if (toggled.length === included.length) {
        toggled = included.concat([elt]);
    }

    return toggled;
}
