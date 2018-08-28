import getModuleNamespace from '../utilities/getModuleNamespace';
import getModules from '../utilities/getModules';

import getComponents from './getComponents';

/**
 * @param {*} query 
 */
export default function find(query) {
    if (typeof query === 'object') {
        let matches = [];
    
        this.DOMNodes.forEach(node => {
            if (query.module) {
                if (query.component) {
                    return matches.push(...getComponents.bind(this)(query.component, query.modifier, query.module));
                }

                return matches.push(...node.querySelectorAll(`.${query.module}, [class*="${query.module + query.modifierGlue}"]`));
            }

            if (query.component) {
                const components = getComponents.bind(this)(query.component);

                if (query.modifier) {
                    return matches.push(
                        ...components.filter(component => {
                            return [...component.classList].some(className => {
                                const isNamespace = className.indexOf(this.namespace || getModuleNamespace(component)) === 0;
                                const hasModifier = className.indexOf(query.modifier) > -1;

                                return isNamespace && hasModifier;
                            });
                        })
                    );
                }

                return matches.push(...components);
            }

            if (query.modifier) {
                return;
            }
        });

        return matches;
    }

    if (typeof query === 'string') {
        if (getComponents.bind(this)(query).length) {
            return getComponents.bind(this)(query);
        }

        if (getModules(this, query).length) {
            return getModules(this, query);
        }
    }
}