import Cookies from 'universal-cookie';

export const getUrlFor = (websiteUrl) => {
  if(websiteUrl.startsWith("http://") || websiteUrl.startsWith("https://"))
    return websiteUrl;
  return "https://" + websiteUrl;
}

export const cookies = new Cookies();