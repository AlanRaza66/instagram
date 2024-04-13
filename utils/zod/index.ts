import { z } from "zod";

import i18next from "i18next";

// @ts-ignore
import { zodI18nMap } from "zod-i18n-map/dist/index.mjs";
import translation from "zod-i18n-map/locales/fr/zod.json";

i18next.init({
  lng: "fr",
  fallbackLng: "fr",
  resources: {
    fr: { zod: translation },
  },
});

z.setErrorMap(zodI18nMap);

export { z };
