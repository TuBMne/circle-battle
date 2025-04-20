import { Fragment } from "react";
import { useState } from "react";
function ListGroup() {
  let items = [
    "Cras justo odio",
    "Dapibus ac facilisis in",
    "Morbi leo risus",
    "Porta ac consectetur ac",
    "Vestibulum at eros",
  ];

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <Fragment>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              "list-group-item" + (selectedIndex === index ? " active" : "")
            }
            onClick={() => {
              handleSelect(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
