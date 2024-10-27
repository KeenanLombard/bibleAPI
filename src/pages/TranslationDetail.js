import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTranslations,
  getBooksInTranslation,
} from "../services/translationServices";

const TranslationDetail = () => {
  const { name } = useParams(); // Get the dynamic URL parameter

  // const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTranslationDetail = async () => {
  //     try {
  //       const data = await getTranslations();
  //       const foundTranslation = data.translations.find(
  //         (t) => t.shortName.toLowerCase() === name.toLowerCase()
  //       );
  //       if (foundTranslation) {
  //         setTranslation(foundTranslation);
  //       } else {
  //         setError("Translation not found");
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTranslationDetail();
  // }, [name]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const data = await getBooksInTranslation(name);
        setBooks(data);
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
      <h1 className='text-4xl'>{books.translation.name}</h1>
      <div className='grid grid-cols-1 gap-5 container mx-auto'>
        {books.books.map((book) => (
          <Link
            to={`/translations/${name}/${book.name}/${book.numberOfChapters}`}
            className='shadow cursor-pointer p-2 hover:bg-gray-100 hover:text-blue-500'
            key={book.id}>
            <p className='font-bold'>{book.name}</p>
            <p className='text-sm text-neutral-500'>{book.title}</p>
            <p className='text-sm text-neutral-500'>
              Number of Chapters: {book.numberOfChapters}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TranslationDetail;
