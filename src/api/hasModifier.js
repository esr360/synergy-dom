import getNamespace from '../utilities/getNamespace';

export default function hasModifier(node, modifier, config) {
    config = Object.assign(this || {}, config || {});

    if (!modifier) return;

    if (modifier.constructor === Array) {
        return modifier.every(modifier => hasModifier(node, modifier, config));
    }

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).every(node => hasModifier(node, modifier, config));
    }

    const { modifierGlue } = config;

    const namespace = config.namespace || node.namespace || getNamespace(node, false, config);

    return [].slice.call(node.classList).some(className => {
        const matchIndex = className.indexOf(modifierGlue + modifier);
        const namespaceMatch  = className.indexOf(namespace) === 0;
        const isModifierTest1 = className.indexOf(modifierGlue + modifier + modifierGlue) > -1;
        const isModifierTest2 = matchIndex > -1 && matchIndex === (className.length - modifier.length - modifierGlue.length);

        return namespaceMatch && (isModifierTest1 || isModifierTest2);
    });
}