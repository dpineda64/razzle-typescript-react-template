declare type GenericObject = {
  [key: string]: any;
};

declare module '*.gql' {
  const value: any;
  export = value;
}

/**
 * from: https://duncanleung.com/typescript-module-declearation-svg-img-assets/
 */
declare module '\*.svg' {
  import React from 'react';
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
