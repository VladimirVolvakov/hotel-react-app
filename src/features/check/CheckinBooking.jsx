import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useFetchBooking } from "../bookings/useFetchBooking";

function CheckinBooking() {
  const { booking = {}, isLoading, error } = useFetchBooking();

  const navigate = useNavigate();
  const navigatePrevPage = () => navigate(-1);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const checkInHandler = () => {};

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={navigatePrevPage}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={checkInHandler}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={navigatePrevPage}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
