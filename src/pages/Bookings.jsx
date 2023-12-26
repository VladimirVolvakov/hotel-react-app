import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Bookings = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
      </Row>
      <BookingTable />
    </>
  );
};

export default Bookings;
