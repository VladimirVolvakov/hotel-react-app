import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useFetchCabinData } from "../cabins/useFetchCabinsData";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoadngBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoadingStays, daysQty } = useRecentStays();
  const { cabins, isLoadingCabins } = useFetchCabinData();

  if (isLoadngBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabins={cabins}
        daysQty={daysQty}
      />
      <div>Today's activity</div>
      <div>Stay durations chart</div>
      <div>Sales chart</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;