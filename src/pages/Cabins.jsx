import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";

const Cabins = () => {
  useEffect(() => {
    getCabins().then(data => console.log(data));
  }, []);

  return <div>Cabins</div>;
};

export default Cabins;
