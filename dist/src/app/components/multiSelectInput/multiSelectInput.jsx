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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
var MultiSelectSearchBar = forwardRef(function (_a, ref) {
    var suggestions = _a.suggestions, onSelect = _a.onSelect;
    var _b = useState(''), query = _b[0], setQuery = _b[1];
    var _c = useState([]), filteredSuggestions = _c[0], setFilteredSuggestions = _c[1];
    var _d = useState(false), showSuggestions = _d[0], setShowSuggestions = _d[1];
    var _e = useState(null), error = _e[0], setError = _e[1];
    var _f = useState([]), selectedValues = _f[0], setSelectedValues = _f[1];
    var _g = useState([]), createdValues = _g[0], setCreatedValues = _g[1];
    var searchBarRef = useRef(null);
    var latestQueryRef = useRef(query);
    var debounce = function (func, delay) {
        var timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };
    var handleFetchSuggestions = useCallback(debounce(function () { return __awaiter(void 0, void 0, void 0, function () {
        var fetchSuggestions;
        return __generator(this, function (_a) {
            fetchSuggestions = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        if (latestQueryRef.current === 'error') {
                            throw new Error('500 Internal Server Error');
                        }
                        setFilteredSuggestions(suggestions.filter(function (suggestion) {
                            return suggestion.toLowerCase().includes(latestQueryRef.current.toLowerCase());
                        }));
                        console.log(latestQueryRef.current);
                        console.log("qury", query);
                        setShowSuggestions(latestQueryRef.current.length > 0);
                        setError(null); // Clear error if successful
                    }
                    catch (e) {
                        setError('500 Internal Server Error');
                    }
                    return [2 /*return*/];
                });
            }); };
            fetchSuggestions();
            return [2 /*return*/];
        });
    }); }, 300), [suggestions]);
    useEffect(function () {
        latestQueryRef.current = query;
        handleFetchSuggestions();
    }, [query, handleFetchSuggestions]);
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
        setQuery(e.target.value);
    };
    var handleSelect = function (value) {
        var _a;
        if (!selectedValues.includes(value)) {
            var newValues = __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(newValues);
            onSelect(newValues);
        }
        setQuery('');
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        (_a = document.getElementById('multi-search-input')) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleCreateNew = function () {
        var _a;
        if (query && !selectedValues.includes(query)) {
            var newValues = __spreadArray(__spreadArray([], selectedValues, true), [query], false);
            setSelectedValues(newValues);
            setCreatedValues(__spreadArray(__spreadArray([], createdValues, true), [query], false));
            onSelect(newValues);
            setQuery('');
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            (_a = document.getElementById('multi-search-input')) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    var handleRemove = function (value) {
        var newValues = selectedValues.filter(function (v) { return v !== value; });
        setSelectedValues(newValues);
        onSelect(newValues);
    };
    return (<div ref={ref} className="relative w-full max-w-md mx-auto">
        <div className="flex flex-wrap items-center w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus-within:border-blue-500">
          {selectedValues.map(function (value, index) { return (<div key={index} className="flex items-center px-2 py-1 mr-2 mb-1 bg-gray-200 rounded-full">
              <span className="text-sm">{value}</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={function () { return handleRemove(value); }}>
                &times;
              </button>
            </div>); })}
          <input id="multi-search-input" type="text" value={query} onChange={handleChange} className="flex-1 min-w-[150px] border-none focus:outline-none" placeholder="Search..."/>
        </div>
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        {showSuggestions && (<ul className="absolute max-h-[300px] overflow-y-scroll overflow-x-hidden w-[350px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {filteredSuggestions.length > 0 ? (filteredSuggestions.map(function (suggestion, index) { return (<li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={function () { return handleSelect(suggestion); }}>
                  <HighlightedText text={suggestion} query={query}/>
                </li>); })) : ("")}
            <li className="px-4 py-2 text-gray-500 border-t border-gray-300">No suggestions ?
                <button className="ml-2 text-sm text-blue-500 rounded-lg" onClick={handleCreateNew}>
                  Create &quot;{query}&quot;
                </button>
              </li>
          </ul>)}
      </div>);
});
MultiSelectSearchBar.displayName = 'MultiSelectSearchBar';
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
export default MultiSelectSearchBar;
