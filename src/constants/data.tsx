import { ColumnHeader } from "../components/Table/interface";

const HEADERS: ColumnHeader[] = [
  {
    title: "id",
    key: "id",
    isHidden: false,
  },
  {
    title: "Title",
    key: "title",
    isHidden: false,
  },
  {
    title: "Popularity",
    key: "popularity",
    isHidden: false,
    isSort: true
  },
  {
    title: "Original Language",
    key: "original_language",
    isHidden: false,
  },
  {
    title: "Release Date",
    key: "release_date",
    isHidden: false,
  },
  {
    title: "Vote Count",
    key: "vote_count",
    isHidden: false,
  },
];

const DATA = [
  {
    id: "1",
    key: "1",
    name: "John Brown",
    email: "abc@example.com",
    dob: "New York No. 1 Lake Park",
  },
  {
    id: "2",
    key: "2",
    name: "John Brown 222",
    email: "abc@example.com 222",
    dob: "New York 2222",
  },
  {
    id: "3",
    key: "3",
    name: "John Brown 333",
    email: "abc@example.com 333",
    dob: "New York No. 1 Lake Park 333",
  },
  {
    id: "4",
    key: "4",
    name: "John Brown 444",
    email: "abc@example.com 444",
    dob: "New York No. 1 Lake Park 444",
  },
  {
    id: "5",
    key: "5",
    name: "John Brown 555",
    email: "abc@example.com 555 ",
    dob: "New York No. 1 Lake Park 555",
  },
];

export { HEADERS, DATA };
