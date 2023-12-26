import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortValue = searchParams.get("sortBy") || "";

  const changeHandler = (event) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      value={currentSortValue}
      options={options}
      type="white"
      onChange={changeHandler}
    />
  );
};

export default SortBy;
