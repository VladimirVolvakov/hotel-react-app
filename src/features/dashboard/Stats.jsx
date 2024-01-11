import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, cabins, daysQty }) => {
  const bookingsQty = bookings?.length;
  const totalSales = bookings?.reduce((acc, stay) => acc + stay.totalPrice, 0);
  const totalCheckinsQty = confirmedStays?.length;

  // Hotel occupancy rate = qty of nights of check-in / qty of all available nights * 100
  const checkInNightsQty = confirmedStays?.reduce(
    (acc, stay) => acc + stay.numNights,
    0
  );

  // Qty of all available nights = qty of cabins * period duration (daysQty from props)
  const cabinsQty = cabins?.length;
  const allNightsQty = cabinsQty * daysQty;
  const occupancyRate = (checkInNightsQty / allNightsQty) * 100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookingsQty}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckinsQty}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate)} %`}
      />
    </>
  );
};

export default Stats;
