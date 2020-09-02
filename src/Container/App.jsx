import React from "react";

import CampaignList from "../Component/CampaignList.jsx";
import mockCampaignData from "../mock";
import Pagination from "../Component/Pagination.jsx"
import "./App.scss";

const App = () => {
  const [masterData,setMasterData] = React.useState(mockCampaignData);
  const [campaignData, setcampaignData] = React.useState([]);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [perPage, setperPage] = React.useState(5);
  const [campaignName, setcampaignName] = React.useState();
  const [campaignDesc, setcampaignDesc] = React.useState();
  const [historyArr, setHistoryArr] = React.useState([]);
  const [selectedField, setselectedField] = React.useState([]);

  //Get Current Data
  React.useEffect(() => {
    const indexLastPost = currentPage * perPage;
    const indexOfFirstPost = indexLastPost - perPage;
    const currentPost = masterData.slice(indexOfFirstPost,indexLastPost);
    setcampaignData(currentPost);
  }, [currentPage])
  
  const paginate = (number) => setcurrentPage(number);

  const handlers = {
    changeStatusHandler: (id, state) => {
      const data = [...campaignData];
      data[id - 1].status = state;
      data[id - 1].history.push(`Status changed to ${state}`);
      setcampaignData(data);
    },
    deleteHandler: (id) => {
      const data = [...campaignData];
      data.splice(id - 1, 1);
      setcampaignData(data);
    },
    editHandler: (id) => {
      setselectedField(id);
      const data = [...campaignData];
      setcampaignName(data[id - 1].name);
      setcampaignDesc(data[id - 1].Description);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    patchHandler: () => {
      const data = [...campaignData];
      data[selectedField - 1].name = campaignName;
      data[selectedField - 1].Description = campaignDesc;
      setcampaignData(data);
    },
    createCampaign: () => {
      const data = [...campaignData];
      let id = data.length;
      id++;
      data.push({
        id,
        name: campaignName,
        Description: campaignDesc,
        status: "Stopped",
        history: [`Campaign Created:${campaignName}`],
        comment: [],
      });
      setcampaignName("");
      setcampaignDesc("");
      setcampaignData(data);
    },
    commentHandler: (id) => {
      const data = [...campaignData];
      const msg = document.querySelector(`#comments-${id}`).value;
      data[id - 1].comment.push(msg);
      data[id - 1].history.push(`Comment added ${msg}`);
      setcampaignData(data);
    },
    showHistory: (id) => {
      const historyArr = [];
      historyArr.push(campaignData[id - 1].history);
      setHistoryArr(...historyArr);
    },
  };

  return (
    <>
      <header>Campaign Manager Dashboard</header>
      <section className="cmg--dashboard-createCampaign">
        <section className="cmg--name">
          Enter Campaign Name:
          <textarea
            text="text"
            value={campaignName}
            onChange={() => setcampaignName(event.target.value)}
          />
        </section>
        <section className="cmg--desc">
          Enter Campaign Description:
          <textarea
            text="text"
            value={campaignDesc}
            onChange={() => setcampaignDesc(event.target.value)}
          />
        </section>
        <span className="btn btn-top" onClick={() => handlers.createCampaign()}>
          Create Campaign
        </span>

        <span className="btn btn-top" onClick={() => handlers.patchHandler()}>
          Save Campaign
        </span>
      </section>
      <section className="cmg--dashboard-container">
        <CampaignList
          dataArr={campaignData}
          handlers={handlers}
          history={historyArr}
        />
      </section>
      <section className="cmg--dashboard-pagination">
      <Pagination postsPerPage={perPage} totalPosts={masterData.length} paginate={paginate}/>
      </section>
    </>
  );
};

export default App;
