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
import { useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPayment, setConfirmPayment] = useState(false);

  const { booking = {}, isLoading, error } = useFetchBooking();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  useEffect(() => setConfirmPayment(booking?.isPaid ?? false), [booking]);

  const navigate = useNavigate();
  const navigatePrevPage = () => navigate(-1);

  const { checkin, isCheckinIn } = useCheckin();

  const checkInHandler = () => {
    if (!confirmPayment) return;

    checkin(bookingId);
  };

  if (isLoading || isCheckinIn) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={navigatePrevPage}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPayment}
          disabled={confirmPayment || isCheckinIn}
          onChange={() => setConfirmPayment((curState) => !curState)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={checkInHandler}
          disabled={!confirmPayment || isCheckinIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={navigatePrevPage}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
