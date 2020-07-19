import * as router from 'react-router-dom';

declare module 'react-router-dom' {
  interface RouteProps {
    id: string;
    private?: boolean;
  }
}
