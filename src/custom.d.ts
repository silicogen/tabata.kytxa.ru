import { CssFunctionReturnType } from '@styled-system/css';
import { CSSProp } from 'styled-components';
declare module 'react' {
    interface Attributes {
        css?: CSSProp | CssFunctionReturnType;
    }
}