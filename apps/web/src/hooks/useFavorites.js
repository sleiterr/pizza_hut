import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFavorite = (id) => {
    const stringId = String(id);
    setFavoriteIds((prev) =>
      prev.includes(stringId)
        ? prev.filter((fid) => fid !== stringId)
        : [...prev, stringId],
    );
  };

  return { favoriteIds, toggleFavorite };
};

//! how to use in component:

// return (
//   <>
//     <FavoritesHero />
//     <ListSummary count={favoriteIds.length} />
//     {loading && <p>Loading...</p>}
//     {error && <p>Error: {error}</p>}
//     <FavoritesPages favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} />
//   </>
// );
