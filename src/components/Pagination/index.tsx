import ReactPaginate from "react-paginate";

interface IProps {
  pageCount: number;
  onPageChange: any;
  page: number;
  className?: string;
}

const Pagination = (props: IProps) => {
  const { pageCount, onPageChange, className, page } = props;

  return (
    <div className={className}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(value) => onPageChange(value.selected + 1)}
        forcePage={page ? page - 1 : 1}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="page-item border rounded-md overflow-hidden bg-white"
        pageLinkClassName="page-link block px-3 py-1 rounded-md font-medium"
        previousClassName="page-item border rounded-md overflow-hidden"
        previousLinkClassName="page-link block px-3 py-1 rounded-md bg-white font-medium"
        nextClassName="page-item border rounded-md overflow-hidden"
        nextLinkClassName="page-link block px-3 py-1 rounded-md bg-white font-medium"
        breakClassName="page-item border rounded-md overflow-hidden"
        breakLinkClassName="page-link block px-3 py-1 rounded-md bg-white font-medium"
        containerClassName="flex gap-5"
        activeClassName="active bg-red-600 text-white"
        activeLinkClassName="active bg-red-600 text-white"
      />
    </div>
  );
};

export default Pagination;
