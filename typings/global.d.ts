declare type GenericObject = {
  [key: string]: any;
};

declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: any;
  export = value;
}

declare module '\*.svg' {
  import React from 'react';
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
