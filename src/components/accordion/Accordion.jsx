import "./Accordion.css";
import { useState } from "react";

export default function Accordion(props) {
  const [expandAccordion, setExpandAccordion] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const { items, renderHeader, renderBody } = props;
  return (
    <div className="accordionContainer">
      {" "}
      <h4
        onClick={() => {
          setExpandAccordion(!expandAccordion);
        }}
      >
        Reviews &darr;
      </h4>
      {expandAccordion &&
        items.map((item, index) => {
          return (
            <div
              className="accordionItem"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="accordionHeader">{renderHeader(item)}</div>
              {openIndex === index && (
                <div className="accordionBody">{renderBody(item)}</div>
              )}
            </div>
          );
        })}
    </div>
  );
}
