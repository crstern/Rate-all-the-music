import Cookies from 'universal-cookie';

export const getUrlFor = (websiteUrl) => {
  if(websiteUrl.startsWith("http://") || websiteUrl.startsWith("https://"))
    return websiteUrl;
  return "https://" + websiteUrl;
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

export const cookies = new Cookies();