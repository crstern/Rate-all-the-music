import React, {useEffect, useState} from 'react';

const GenreDetails = (props) => {
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    setGenre(props.genre);
  }, [])

  return (
    <div>
      {genre &&
      <p>genre.name</p>}
    </div>
  );
}

export default GenreDetails;