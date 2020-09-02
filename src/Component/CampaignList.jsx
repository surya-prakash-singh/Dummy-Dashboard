import React from "react";
import Card from "./Card.jsx";

const CampaignList = ({ dataArr, handlers, history }) => {
  return (
    <>
      <section className="cmg-campaign-list">
        {dataArr.map((data) => (
          <Card data={data} handlers={handlers} />
        ))}
      </section>
      {Boolean(history.length) && (
        <section className="cmg-campaign-history">
          <h2>History for Selected Campaign</h2>
          {history.map((item) => (
            <section className="cmg--detail-card">{item}</section>
          ))}
        </section>
      )}
    </>
  );
};

export default CampaignList;
