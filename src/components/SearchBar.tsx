import { useEffect, useState } from 'react';
import type { Game } from '../types';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/games/search?name=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          setResults([]);
          setLoading(false);
          return;
        }
        const data: Game[] = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  const handleSelectGame = (game: Game) => {
    console.log('Selected game:', game);
  };

  const skeletonCount = 6;

  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        .skeleton {
          background: slategray;
          border-radius: 6px;
          display: inline-block;
          line-height: 1;
          overflow: hidden;
          position: relative;
        }
        .skeleton::after{
          content: "";
          position: absolute;
          top: 0;
          left: -150px;
          height: 100%;
          width: 150px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0));
          animation: loading 1.2s infinite;
        }
        @keyframes loading {
          0% { left: -150px; }
          100% { left: 100%; }
        }
        .skeleton-image {
          width: 85px;
          height: 128px;
          border-radius: 4px;
          display: block;
        }
        .skeleton-title {
          height: 16px;
          width: 110px;
          margin: 6px 0;
          border-radius: 4px;
        }
        .skeleton-subtitle {
          height: 12px;
          width: 80px;
          border-radius: 4px;
        }
        .search-results {
          position: relative;
          background-color: white;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 78vh;
          overflow-x: auto;
          overflow-y: hidden;
          z-index: 20;
          margin-bottom: 10px;
          padding: 1px;
          border: 1px solid #dbdbdb;
          border-radius: 6px;
        }
        .result-cell {
          cursor: pointer;
          height: 130px;
          width: 250px;
          vertical-align: top;
          padding: 6px;
        }
      `}</style>

      <input
        type='text'
        className='input mb-2'
        placeholder='Search games...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label='Buscar juegos'
        aria-busy={loading}
      />

      {(loading || results.length > 0) && (
        <div
          className='search-results'
          role='list'
          aria-live='polite'
        >
          <table className='table is-fullwidth is-bordered is-striped'>
            <tbody>
              <tr>
                {loading
                  ? Array.from({ length: skeletonCount }).map((_, i) => (
                      <td
                        key={`skeleton-${i}`}
                        className='result-cell'
                        aria-hidden='true'
                      >
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                          }}
                        >
                          <span className='skeleton skeleton-image' />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                            }}
                          >
                            <span className='skeleton skeleton-title' />
                            <span className='skeleton skeleton-subtitle' />
                          </div>
                        </div>
                      </td>
                    ))
                  : results.map(game => (
                      <td
                        key={game._id}
                        className='result-cell'
                        onClick={() => handleSelectGame(game)}
                      >
                        <div
                          className='is-flex image'
                          style={{ margin: '0 auto', width: 'fit-content' }}
                        >
                          <img
                            src={game.imageUrl}
                            alt={game.title}
                            style={{
                              margin: '0 auto',
                              height: '128px',
                              objectFit: 'cover',
                              maxWidth: '90px',
                              imageRendering: 'auto',
                              borderRadius: 4,
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
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
                        {!game.createdAt && (
                          <div style={{ textAlign: 'center' }}>
                            <span className='tag is-tiny is-warning'>
                              Data provided by RAWG
                            </span>
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
