import Dropdown from "./components/Dropdown";

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

  return (
    <div className="App">
      <div style={{ width: 350, padding: 50 }}>
        Single select
        <Dropdown
          placeHolder="Select an item"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <br />
        Multi select
        <Dropdown
          isMulti
          placeHolder="Select items"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <br />
        Disalbe closing the dropdown on outside click
        <Dropdown
          closeOnOutsideClick={false}
          placeHolder="Select items"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
        <Dropdown
          isMulti
          closeOnOutsideClick={false}
          placeHolder="Select items"
          menuItems={menuItems}
          onChange={(value) => console.log(value)}
        />
      </div>
    </div>
  );
}
