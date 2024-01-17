import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { useCheckout } from "../check/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useFetchBooking } from "./useFetchBooking";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { booking = {}, isLoading, error } = useFetchBooking();
  const { id: bookingId, status } = booking;

  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const navigatePrevPage = () => navigate(-1);
  const navigateCheckIn = () => navigate(`/checkin/${bookingId}`);

  const deleteBookingHandler = () => {
    deleteBooking(bookingId);
    navigatePrevPage();
  };

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={navigatePrevPage}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={navigateCheckIn}>Check In</Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}

        <Button
          variation="danger"
          onClick={deleteBookingHandler}
          disabled={isDeletingBooking}
        >
          Delete booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={navigatePrevPage}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
