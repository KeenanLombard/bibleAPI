import React, { useEffect, useState } from "react";
import { getChapterInBook } from "../services/translationServices";
import { useParams } from "react-router-dom";
import PageRender from "../componets/PageRender";

function ChapterDetail() {
  const [currentVerse, setCurrentVerse] = useState(1);
  const { name, book, number } = useParams(); // Get the dynamic URL parameters

  // Handle incrementing and decrementing the verse index
  const incrementVerse = () => setCurrentVerse((prevVerse) => prevVerse + 1);
  const decrementVerse = () =>
    setCurrentVerse((prevVerse) => (prevVerse > 0 ? prevVerse - 1 : 0));

  console.log(currentVerse);

  return (
    <div className='flex justify-between items-top'>
      <button
        className='h-20  rounded bg-blue-100 shadow text-blue-900 font-semibold px-4 py-2'
        onClick={decrementVerse}
        disabled={currentVerse === 0} // Disable when at the first verse
      >
        Prev
      </button>

      <PageRender verse={currentVerse} />

      <button
        className='h-20  rounded bg-blue-100 shadow text-blue-900 font-semibold px-4 py-2'
        onClick={incrementVerse}>
        Next
      </button>
    </div>
  );
}

export default ChapterDetail;
