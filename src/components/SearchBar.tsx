import { useState } from 'react';
import type { Game } from '../types';

import { useEffect } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/games/search?name=${encodeURIComponent(
            query
          )}`
        );
        const data: Game[] = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectGame = (game: Game) => {
    console.log('Selected game:', game);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type='text'
        className='input mb-2'
        placeholder='Search games...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div
          style={{
            position: 'relative',
            backgroundColor: 'white',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '78vh',
            overflowX: 'auto',
            overflowY: 'hidden',
            zIndex: 20,
            marginBottom: '10px',
          }}
        >
          <table className='table is-fullwidth is-bordered is-striped'>
            <tbody>
              <tr>
                {results.map(game => (
                  <td
                    key={game._id}
                    style={{
                      cursor: 'pointer',
                      height: '130px',
                      width: '250px',
                      verticalAlign: 'top',
                    }}
                    onClick={() => handleSelectGame(game)}
                  >
                    {game.imageUrl && (
                      <div
                        className='is-flex image'
                        style={{
                          margin: '0 auto',
                          width: 'fit-content',
                        }}
                      >
                        <img
                          src={game.imageUrl}
                          alt={game.title}
                          style={{
                            margin: '0 auto',
                            height: '128px',
                            objectFit: 'cover',
                            maxWidth: '80px',
                          }}
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <p
                            className='title-is-small'
                            style={{ textAlign: 'center', width: '125px' }}
                          >
                            {game.title}
                          </p>

                          <p
                            className='subtitle-is-small'
                            style={{ textAlign: 'center', width: '125px' }}
                          >
                            {game.platform}
                          </p>
                        </div>
                      </div>
                    )}

                    {game.createdAt === null && (
                      <div style={{ textAlign: 'center' }}>
                        <span className='tag is-info is-light'>RAWG</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
