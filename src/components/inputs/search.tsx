import { colors } from "../../constants/colors";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <input
      type='text'
      placeholder='Buscar usuario...'
      value={searchTerm}
      onChange={handleSearch}
      style={{
        width: "100%",
        maxWidth: 360,
        padding: "10px 14px",
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
        color: colors.text,
        outline: "none",
        fontSize: 15,
      }}
    />
  );
};

export default Search;
