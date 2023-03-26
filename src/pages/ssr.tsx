/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface HomeProps {
  pokemon: any;
}

export default function Home({ pokemon }: HomeProps) {
  const [reviews, setReviews] = useState<any>(null);

  const handleGetReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then(setReviews);
  };

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <button onClick={handleGetReviews}>Load more pokemons</button>
      {reviews && (
        <ul>
          {reviews.map((review: any) => (
            <li key={review.id}>
              <p>{review.title}</p>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1/`);
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
}
