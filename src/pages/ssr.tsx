/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface HomeProps {
  book: any;
}

export default function Home({ book }: HomeProps) {
  const [reviews, setReviews] = useState<any>(null);

  const handleGetReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then(setReviews);
  };

  return (
    <div>
      <img src={book.imageUrl} alt={book.title} width="250" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={handleGetReviews}>Load reviews</button>
      {reviews && (
        <ul>
          {reviews.map((review: any) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonkeeper.com/b/AFRW`);
  const book = await res.json();

  return {
    props: {
      book,
    },
  };
}
