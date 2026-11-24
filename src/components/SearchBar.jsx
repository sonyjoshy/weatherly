import { Paper, InputBase, Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ city, setCity, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      role="search"
      elevation={0}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1, p: 0.75, pl: 2.5,
        borderRadius: 999, border: 1, borderColor: 'divider',
        '&:focus-within': { borderColor: 'primary.main', boxShadow: (t) => `0 0 0 3px ${t.palette.primary.main}33` }
      }}
    >
      <InputBase
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search a city, e.g. Kochi, IN"
        inputProps={{ 'aria-label': 'City name' }}
        autoFocus
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        disableElevation
        startIcon={!loading && <SearchIcon />}
        sx={{ borderRadius: 999, px: 3, flexShrink: 0, minWidth: 116 }}
      >
        {loading ? <CircularProgress size={22} color="inherit" /> : 'Search'}
      </Button>
    </Paper>
  );
}

export default SearchBar;