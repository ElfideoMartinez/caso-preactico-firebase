import { ClipLoader } from "react-spinners";
import { colors } from "../../constants/colors";

const Loader = ({ size = 40 }: { size?: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        width: "100%",
      }}
    >
      <ClipLoader color={colors.primary} size={size} />
    </div>
  );
};

export default Loader;
