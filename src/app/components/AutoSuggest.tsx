import React, { forwardRef, useState, useImperativeHandle, ChangeEvent, KeyboardEvent, Ref, useEffect, useRef } from 'react';

type SearchBarProps = {
  suggestions: string[];
  onSelect: (value: string) => void;
};

type SearchBarHandle = {
  focus: () => void;
};

const SearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
  ({ suggestions, onSelect }, ref) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [error, setError] = useState<string | null>(null);

    const searchBarRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        const input = document.getElementById('search-input') as HTMLInputElement;
        input?.focus();
      }
    }));

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [query]);

    useEffect(() => {
      if (debouncedQuery) {
        // Simulate fetching suggestions or other async operation
        const fetchSuggestions = async () => {
          try {
            // Example logic that might throw an error
            // Replace this with actual API call if needed
            if (debouncedQuery === 'error') {
              throw new Error('500 Internal Server Error');
            }
            
            setFilteredSuggestions(
             
              suggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
              )
            );
            console.log("setting suggestions")
            setShowSuggestions(debouncedQuery.length > 0);
            setError(null); // Clear error if successful
          } catch (e) {
            setError('500 Internal Server Error');
          }
        };
        fetchSuggestions();
      } else {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setError(null);
      }
    }, [debouncedQuery, suggestions]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
    };

    const handleSelect = (value: string) => {
      console.log('Selected suggestion:', value);
      setQuery(value);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      onSelect(value);
    };

    // const handleKeyDown = (e: KeyboardEvent) => {
    //   if (e.key === 'Enter' && filteredSuggestions.length > 0) {
    //     handleSelect(filteredSuggestions[0]);
    //   }
    // };

    return (
      <div ref={searchBarRef} className="relative w-full max-w-md mx-auto">
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          className="w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search..."
        />
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        {showSuggestions && (
          <ul className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350p] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(suggestion)}
                >
                  <HighlightedText text={suggestion} query={query} />
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No suggestions</li>
            )}
          </ul>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

type HighlightedTextProps = {
  text: string;
  query: string;
};

const HighlightedText = (props: HighlightedTextProps) => {
  if (!props.query) return <>{props.text}</>;

  const parts = props.text.split(new RegExp(`(${props.query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === props.query.toLowerCase() ? (
          <span key={index} className="text-gray-400 font-semibold">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default SearchBar;
