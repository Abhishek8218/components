import React from 'react';
type SearchBarProps = {
    suggestions: string[];
    onSelect: (value: string) => void;
};
type SearchBarHandle = {
    focus: () => void;
};
declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<SearchBarHandle>>;
export default SearchBar;
//# sourceMappingURL=AutoSuggest.d.ts.map