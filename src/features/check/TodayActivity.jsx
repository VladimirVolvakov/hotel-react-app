import styled from "styled-components";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayActivityItem from "./TodayActivityItem";
import { useTodayActivity } from "./useTodayActivity";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const TodayActivity = () => {
  const { stays, isLoadingStays } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoadingStays ? (
        stays?.length > 0 ? (
          <TodayList>
            {stays.map((stay) => (
              <TodayActivityItem key={stay.id} stay={stay} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
};

export default TodayActivity;
