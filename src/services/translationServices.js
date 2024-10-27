import axios from "axios";

const BASE_URL = "https://bible.helloao.org/api/available_translations.json";

export const getTranslations = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getBooksInTranslation = async (translation) => {
  const URL = `https://bible.helloao.org/api/${translation}/books.json`;
  const response = await axios.get(URL);
  return response.data;
};

export const getChapterInBook = async (translation, book, num) => {
  const URL = `https://bible.helloao.org/api/${translation}/${book}/${num}.json`;
  const response = await axios.get(URL);
  return response.data;
};
