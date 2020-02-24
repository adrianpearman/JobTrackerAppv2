import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <ul className="inline text-center">
        {children.map((elem, index) => {
          let style = index === selectedTab ? "selected" : "";
          let title = elem.props.title;
          return (
            <li
              className={style}
              key={index}
              onClick={() => setSelectedTab(index)}
            >
              {title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{children[selectedTab]}</div>
    </div>
  );
};

export default Tabs;
