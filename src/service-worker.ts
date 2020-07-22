import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  ...self.__WB_MANIFEST,
  {
    url: '/?pwa',
    revision: null,
  },
]);
