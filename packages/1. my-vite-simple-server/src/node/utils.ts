const knownJsSrcRE = /\.((j|t)sx?|mjs|vue|marko|svelte|astro)($|\?)/;
export const isJSRequest = (url: string): boolean => {
  url = cleanUrl(url);
  return knownJsSrcRE.test(url);
};

export const queryRE = /\?.*$/s;
export const hashRE = /#.*$/s;

export const cleanUrl = (url: string): string => url.replace(hashRE, '').replace(queryRE, '');
