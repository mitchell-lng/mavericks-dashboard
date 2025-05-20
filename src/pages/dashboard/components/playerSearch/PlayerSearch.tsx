import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useData } from '../../../../hooks/DataContext';

import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SearchResult {
  id: number
  name: string
  link: string
  photoUrl: string
}

interface SearchResults {
  results: SearchResult[]
}

interface PlayerSearchProps {
  function?: (arg: number) => void;
}

const PlayerSearch = (props: PlayerSearchProps) => {
    const { data } = useData();

    const handleClick = (id: number) => {
      props.function?.(id);

      setSearch(''); // Clear the search input after selection
    };

    const [search, setSearch] = useState('')  
    const [searchResults, setSearchResults] = useState<SearchResults>({ results: [] });

    useEffect(() => {
        const timeout = setTimeout(() => {
          if (search === '') {
            setSearchResults({ results: [] });
            return;
          }
    
          const filtered = data.players?.filter((player) => {
            return player.playerBio.name.toLowerCase().includes(search.toLowerCase());
          }) || [];
      
          setSearchResults({
            results: filtered.map((player) => ({
              id: player.playerId,
              name: player.playerBio.name,
              link: `/dashboard/player/${player.playerId}`,
              photoUrl: player.playerBio.photoUrl ?? '',
            }))
          });
        }, 0); // Debounce time
      
        return () => clearTimeout(timeout);
      }, [search]);

    return (
        <Autocomplete
                freeSolo
                options={searchResults.results}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                filterOptions={(x) => x}
                value={search}
                onInputChange={(_, newInputValue) => {
                  setSearch(newInputValue);
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}  onClick={() => handleClick(option.id)}>
                    <div style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar src={option.photoUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={option.name} />
                      </ListItem>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: '300px' }}
                    label="Search"
                    variant="standard"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          <InputAdornment position="end">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </InputAdornment>
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
    )
}

export default PlayerSearch