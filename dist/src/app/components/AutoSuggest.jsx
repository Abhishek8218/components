var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { forwardRef, useState, useImperativeHandle, useEffect, useRef } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
var SearchBar = forwardRef(function (_a, ref) {
    var suggestions = _a.suggestions, onSelect = _a.onSelect;
    var _b = useState(''), query = _b[0], setQuery = _b[1];
    var _c = useState([]), filteredSuggestions = _c[0], setFilteredSuggestions = _c[1];
    var _d = useState(false), showSuggestions = _d[0], setShowSuggestions = _d[1];
    var _e = useState(query), debouncedQuery = _e[0], setDebouncedQuery = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState(false), justSelected = _g[0], setJustSelected = _g[1];
    var searchBarRef = useRef(null);
    useImperativeHandle(ref, function () { return ({
        focus: function () {
            var input = document.getElementById('search-input');
            input === null || input === void 0 ? void 0 : input.focus();
        }
    }); });
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedQuery(query);
        }, 300);
        return function () {
            clearTimeout(handler);
        };
    }, [query]);
    useEffect(function () {
        if (debouncedQuery && !justSelected) {
            var fetchSuggestions = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (debouncedQuery === 'error') {
                            throw new Error('500 Internal Server Error');
                        }
                        setFilteredSuggestions(suggestions.filter(function (suggestion) {
                            return suggestion.toLowerCase().includes(debouncedQuery.toLowerCase());
                        }));
                        setTimeout(function () {
                            setShowSuggestions(debouncedQuery.length > 0);
                        }, 100);
                        setError(null); // Clear error if successful
                    }
                    catch (e) {
                        setError('500 Internal Server Error');
                    }
                    return [2 /*return*/];
                });
            }); };
            fetchSuggestions();
        }
        else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            setError(null);
        }
    }, [debouncedQuery, suggestions, justSelected]);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleChange = function (e) {
        if (justSelected) {
            setJustSelected(false);
            return;
        }
        setQuery(e.target.value);
    };
    var handleSelect = function (value) {
        setQuery(value);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setJustSelected(true);
        onSelect(value);
        var input = document.getElementById('search-input');
        if (input) {
            input.blur();
            setTimeout(function () {
                input.focus();
            }, 100);
        }
    };
    return (<div ref={searchBarRef} className="relative w-full max-w-md mx-auto">
        <input id="search-input" type="text" value={query} onChange={handleChange} className="w-[350px] flex gap-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Search..."/>
       {query && <div className="absolute right-28 top-0 flex flex-row gap-1 p-2"><MaterialSymbol icon='close' size={24} color='#B4B4B8' onClick={function () { return setQuery(''); }}/><span className=' text-[#B4B4B8]'>|</span><MaterialSymbol icon='search' size={24} color='#B4B4B8'/></div>} 
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        {showSuggestions && (<ul className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {filteredSuggestions.length > 0 ? (filteredSuggestions.map(function (suggestion, index) { return (<li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={function () { return handleSelect(suggestion); }}>
                  <HighlightedText text={suggestion} query={query}/>
                </li>); })) : (<li className="px-4 py-2 text-gray-500">No suggestions</li>)}
          </ul>)}
      </div>);
});
SearchBar.displayName = 'SearchBar';
var HighlightedText = function (_a) {
    var text = _a.text, query = _a.query;
    if (!query)
        return <>{text}</>;
    var parts = text.split(new RegExp("(".concat(query, ")"), 'gi'));
    return (<>
      {parts.map(function (part, index) {
            return part.toLowerCase() === query.toLowerCase() ? (<span key={index} className="text-gray-400 font-semibold">{part}</span>) : (<span key={index}>{part}</span>);
        })}
    </>);
};
export default SearchBar;
