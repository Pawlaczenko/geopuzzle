import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider.js';
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { coordSuggestion } from "src/types/input.types";

export const useLocationSearch = () => {
    const [suggestions, setSuggestions] = useState<coordSuggestion[] | undefined>(undefined);
    const searchProvider = new OpenStreetMapProvider({
        params: {
            limit: 5
        }
    });

    const resetSuggestions = () => {
        setSuggestions([]);
    }

    const handleLocationSearch = useCallback(debounce(async (query: string) => {
        const results : SearchResult<RawResult>[] = await searchProvider.search({query: query});
        const suggestions : coordSuggestion[] = results.map(item => {
            return {
                label: item.label,
                coords: [item.y, item.x]
            }
        });
        setSuggestions(suggestions);
    }, 300),[]);

    useEffect(() => {
        return () => {
          handleLocationSearch.cancel();
        };
      }, []);

      return {suggestions, handleLocationSearch,resetSuggestions};
}