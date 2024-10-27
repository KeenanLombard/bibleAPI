import React, { useEffect, useState } from "react";
import { getChapterInBook } from "../services/translationServices";
import { useParams } from "react-router-dom";

function PageRender({ verse }) {
  const { name, book, number } = useParams(); // Get the dynamic URL parameter

  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      setLoading(true); // Reset loading state
      setError(null); // Reset error state
      try {
        const data = await getChapterInBook(name, book, verse); // Fetch data with current verse
        setText(data.chapter.content);
        console.log("SUCCESS");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [name, book, verse]); // Depend on `name`, `book`, and `verse`

  console.log(text);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='w-1/2 mx-auto shadow-xl p-2 mb-10'>
      {text.map((element, index) => {
        if (element.type === "heading") {
          return (
            <h1 key={index} className='font-semibold text-xl'>
              {element.content[0]}
            </h1>
          );
        } else if (element.type === "verse") {
          return (
            <div
              key={index}
              className='text-sm hover:bg-gray-200 cursor-pointer'>
              {element.content.map((contentItem, i) => {
                if (typeof contentItem === "string") {
                  return <p key={i}>{contentItem}</p>;
                } else {
                  return <p key={i}>note?</p>;
                }
              })}
            </div>
          );
        } else if (element.type === "line_break") {
          return <br key={index} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default PageRender;
