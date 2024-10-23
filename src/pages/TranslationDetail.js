import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTranslations,
  getBooksInTranslation,
} from "../services/translationServices";

const TranslationDetail = () => {
  const { name } = useParams(); // Get the dynamic URL parameter
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranslationDetail = async () => {
      try {
        const data = await getTranslations();
        const foundTranslation = data.translations.find(
          (t) => t.shortName.toLowerCase() === name.toLowerCase()
        );
        if (foundTranslation) {
          setTranslation(foundTranslation);
        } else {
          setError("Translation not found");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTranslationDetail();
  }, [name]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const data = await getBooksInTranslation(name);
        setBooks(data); // data.translations should be an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container mx-auto text-center'>
      <h1 className='text-4xl'>{translation.name}</h1>
      <ul className='grid grid-cols-1 gap-5 container mx-auto'>
        {books.books.map((book) => (
          <li
            className='shadow cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-500'
            key={book.id}>
            {book.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationDetail;
