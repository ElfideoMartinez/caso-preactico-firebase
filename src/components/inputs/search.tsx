import { spacing } from "../../constants/spacing";
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
      placeholder='Search...'
      value={searchTerm}
      onChange={handleSearch}
      style={{
        marginTop: spacing.lg,
        maxWidth: 400,
        padding: spacing.sm,
        borderRadius: spacing.sm,
        border: `1px solid ${colors.border}`,
      }}
    />
  );
};

export default Search;
