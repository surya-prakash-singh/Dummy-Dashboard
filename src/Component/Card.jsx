import React from "react";

const Card = ({ data, handlers }) => {
  return (
    <section className="cmg--detail-card">
      <h2 id={data.name} className="cmg--detail-title">
        {data.name}
      </h2>
      <section className="cmg--detail-description">
        <h2>Description:-</h2> 
{' '}
{data.Description}
      </section>
      <section className="cmg--detail-action">
        <span class="btn">{data.status}</span>

        <span className="btn" onClick={() => handlers.editHandler(data.id)}>
          Edit
        </span>

        <span className="btn" onClick={() => handlers.deleteHandler(data.id)}>
          Delete
        </span>

        <span
        <span className="btn" onClick={()=>handlers.changeStatusHandler(data.id,(data.status == 'Running'? 'Stopped': 'Running'))}>
         {data.status == "Running" ? "Pause" : "Resume"}
       </span>
        <span className="btn" onClick={() => handlers.showHistory(data.id)}>
          See History
        </span>

        <section className="cmg--detail-comment">
        <textarea id={`comments-${data.id}`} className="cmg--dashboard-commentBox">
            Hey... say something!
          </textarea>
          <span class="btn" onClick={() => handlers.commentHandler(data.id)}>
            Add Comment
          </span>
        </section>

        {data.comment.map((item) => (
          <section className="cmg--detail-comment">
            {item}
            <br />
          </section>
        ))}
      </section>
    </section>
  );
};

export default Card;
