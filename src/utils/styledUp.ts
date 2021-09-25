export const styledUpFunc = <T>(f: (p: T) => any) => (p: T) => `styledUpFunc: ${f(p).toString()};`;

export const styledUpVal = (v: any) => ({ styledUpVal: v.toString() as string });