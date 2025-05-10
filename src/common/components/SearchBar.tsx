import SearchIcon from "@mui/icons-material/Search";
import { Button, InputBase, Paper } from "@mui/material";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (inputSearch: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "40px",
        width: "80%",
      }}
    >
      <Button
        variant="contained"
        sx={{
          height: "100%",
          borderRadius: 0,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          bgcolor: "grey.400",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }}
        aria-label="menu"
      >
        All
      </Button>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        defaultValue={""}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        placeholder="Search Amazon"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Button
        variant="contained"
        sx={{
          height: "100%",
          borderRadius: 0,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          bgcolor: "primary.light",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        }}
        type="submit"
        aria-label="search"
        onClick={(e) => {
          e.preventDefault();
          onSearch(inputSearch);
        }}
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
};

export default SearchBar;
