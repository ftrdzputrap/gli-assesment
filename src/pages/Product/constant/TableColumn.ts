export default [
  {
    id: "images",
    title: "Thumbnail",
    className: "w-20",
  },
  {
    id: "title",
    title: "Product",
    className: "w-[200px] whitespace-normal",
    render: (value, row) => value,
  },
  {
    id: "description",
    title: "Description",
    className: "w-[500px] whitespace-normal line-clamp-4",
    render: (value, row) => value,
  },
  {
    id: "category",
    title: "Category",
    render: (category) => category?.name,
  },
  {
    id: "price",
    title: "Price",
    className: "font-bold",
    render: (value, row) => "$" + value,
  },
  {
    id: "actions",
    title: "Actions",
    headerClassName: "text-center",
    className: "text-center",
  },
];
