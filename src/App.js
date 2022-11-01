import Dropdown from "./components/Dropdown";
import useFetch from "./hooks/useFetch";
import { useState } from "react";

export default function App() {
  const menuItems = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  // a large book list
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, lists, hasMore } = useFetch(pageNum);

  return (
    <div className="App">
      <div style={{ width: 350, padding: 50 }}>
        Single select
        <Dropdown
          placeHolder="Select a month"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <br />
        Multi select
        <Dropdown
          isMulti
          placeHolder="Select months"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <br />
        Disable closing the dropdown on outside click
        <Dropdown
          closeOnOutsideClick={false}
          placeHolder="Select a month"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <Dropdown
          isMulti
          closeOnOutsideClick={false}
          placeHolder="Select months"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <br />
        Select from a large book list (infinite scroll) <br />
        Loading takes a few seconds
        <Dropdown
          placeHolder="Select a book"
          menuItems={lists}
          onChange={(value) => console.log(value)}
          isLoading={isLoading}
          error={error}
          hasMore={hasMore}
          setPageNum={setPageNum}
        />
      </div>
    </div>
  );
}
