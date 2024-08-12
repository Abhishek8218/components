import React, { forwardRef, useState, ChangeEvent, useEffect, useRef } from 'react';

type SearchBarProps = {
  suggestions: string[];
  onSelect: (value: string[]) => void;
};

const MultiSelectSearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ suggestions, onSelect }, ref) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [error, setError] = useState<string | null>(null);

    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    const searchBarRef = useRef<HTMLDivElement>(null);
    
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
        const fetchSuggestions = async () => {
            try {
                if (debouncedQuery === 'error') {
                    throw new Error('500 Internal Server Error');
                }
                
                setFilteredSuggestions(
                    suggestions.filter((suggestion) =>
                        suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
                )
            );
            setTimeout(() => {
                setShowSuggestions(debouncedQuery.length > 0);
            }, 100);
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
        
        setQuery(e.target.value);
    };
    
    const handleSelect = (value: string) => {
        if (!selectedValues.includes(value)) {
            const newValues = [...selectedValues, value];
            setSelectedValues(newValues);
            onSelect(newValues);
        }
        setQuery('');
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        document.getElementById('multi-search-input')?.focus();
        
    };
    const handleRemove = (value: string) => {
        const newValues = selectedValues.filter((v) => v !== value);
        setSelectedValues(newValues);
        onSelect(newValues);
    };
    
    return (
        <div ref={ref} className="relative w-full max-w-md mx-auto">
        <div className="flex flex-wrap items-center w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus-within:border-blue-500">
          {selectedValues.map((value, index) => (
            <div
              key={index}
              className="flex items-center px-2 py-1 mr-2 mb-1 bg-gray-200 rounded-full"
              >
              <span className="text-sm">{value}</span>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemove(value)}
                >
                &times;
              </button>
            </div>
          ))}
          <input
            id="multi-search-input"
            type="text"
            value={query}
            onChange={handleChange}
            className="flex-1 min-w-[150px] border-none focus:outline-none"
            placeholder="Search..."
          />
        </div>
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        {showSuggestions && (
          <ul className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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

MultiSelectSearchBar.displayName = 'MultiSelectSearchBar';

type HighlightedTextProps = {
  text: string;
  query: string;
};

const HighlightedText = ({ text, query }: HighlightedTextProps) => {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-gray-400 font-semibold">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default MultiSelectSearchBar;
