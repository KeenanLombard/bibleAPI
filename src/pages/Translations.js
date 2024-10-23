import { useEffect, useState } from "react";
import {
  getTranslations,
  getBooksInTranslation,
} from "../services/translationServices";
import { Link } from "react-router-dom";

function Translations() {
  const [translations, setTranslations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const data = await getTranslations();
        setTranslations(data.translations); // data.translations should be an array
        setSearchResults(data.translations); // Initialize searchResults with all translations
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  function searchByName(array, name) {
    const lowerCaseName = name.toLowerCase();
    return array.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseName)
    );
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredResults = searchByName(translations, e.target.value); // Just pass translations here
    setSearchResults(filteredResults); // Update searchResults based on filtered data
  };

  console.log(translations);
  return (
    <>
      <header className='flex justify-center'>
        <input
          className='border w-1/2 p-1 m-1 rounded my-5'
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          placeholder='Search...'
        />
      </header>
      <div className='grid grid-cols-3 gap-5 container mx-auto'>
        {searchResults.map((translation) => (
          <Link
            className='shadow cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-500'
            to={`/translations/${translation.shortName}`}>
            <p className='font-bold'>{translation.name}</p>
            <p className='text-sm text-neutral-500'>
              Language: {translation.languageEnglishName}
            </p>
            <p className='text-sm text-neutral-500'>
              Books: {translation.numberOfBooks}
            </p>
            <p className='text-sm text-neutral-500'>
              Chapters: {translation.totalNumberOfChapters}
            </p>
            <p className='text-sm text-neutral-500'>
              Verses: {translation.totalNumberOfVerses}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Translations;
