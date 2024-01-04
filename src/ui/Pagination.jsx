import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const QTY_PER_PAGE = 10;

const Pagination = ({ resultsQty }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNum = !searchParams.get("page")
    ? 1
    : +searchParams.get("page");

  const pagesQty = Math.ceil(resultsQty / QTY_PER_PAGE);

  const resultsStartNum = (currentPageNum - 1) * QTY_PER_PAGE + 1;
  const resultsFinishNum =
    currentPageNum === pagesQty ? resultsQty : currentPageNum * QTY_PER_PAGE;

  const prevBtnClickHandler = () => {
    const prevPageNum =
      currentPageNum === 1 ? currentPageNum : currentPageNum - 1;

    searchParams.set("page", prevPageNum);
    setSearchParams(searchParams);
  };

  const nextBtnClickHandler = () => {
    const nextPageNum =
      currentPageNum === pagesQty ? currentPageNum : currentPageNum + 1;

    searchParams.set("page", nextPageNum);
    setSearchParams(searchParams);
  };

  if (resultsQty <= 10) return null;

  return (
    <StyledPagination>
      <P>
        <span>{resultsStartNum}</span> to <span>{resultsFinishNum}</span> of{" "}
        <span>{resultsQty}</span> results
      </P>
      <Buttons>
        <PaginationButton
          onClick={prevBtnClickHandler}
          disabled={currentPageNum === 1}
        >
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextBtnClickHandler}
          disabled={currentPageNum === pagesQty}
        >
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
