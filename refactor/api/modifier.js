import hasModifier from './hasModifier';
import addModifier from './addModifier';
import removeModifier from './removeModifier';

export default function modifier(node, modifier, operator, config) {
    config = config || this;

    if (!operator || operator === 'is') {
        return hasModifier(node, modifier, config);
    }

    if (operator === 'set' || operator === 'add') {
        return addModifier(node, modifier, config);
    }

    if (operator === 'unset' || operator === 'remove') {
        return removeModifier(node, modifier, config);
    }

    // @TODO
    // if (operator === 'toggle') {
    // }
}