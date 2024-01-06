import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useFetchBooking } from "./useFetchBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { booking = {}, isLoading, error } = useFetchBooking();
  const { id: bookingId, status } = booking;

  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();
  const navigatePrevPage = () => navigate(-1);
  const navigateCheckIn = () => navigate(`/checkin/${bookingId}`);

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

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
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}

        <Button variation="secondary" onClick={navigatePrevPage}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
