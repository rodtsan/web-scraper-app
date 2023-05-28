import Layout from "@/components/Layout";
import classNames from "classnames";
import React from "react";

export default function LinkedIn() {
  const [linkedInUrl, setLinkedUrl] = React.useState("");
  const [linkedInData, setLinkedInData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function linkedInFetch(url: string) {
    setLoading(true);
    setLinkedInData({});
    fetch(`http://localhost:8000/api/linkedin?url=${decodeURI(url)}`, {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     url: decodeURI(url),
      //   }),
    })
      .then((r) => r.json())
      .then(setLinkedInData)
      .finally(() => setLoading(false));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedUrl(event.target.value);
  };

  const handleClick = () => {
    linkedInFetch(linkedInUrl);
  };
  return (
    <Layout>
      <div className="linkedin">
        <h2>Web scrape your <span className="linkedin">LinkedIn</span> page here:</h2>
        <br />
        <div className="input-group mb-3">
          <span className="input-group-text bg-white" id="basic-addon1">
            URL
          </span>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label=""
            aria-describedby="basic-addon2"
            onChange={handleChange}
            disabled={loading}
          />
          <button
            className={classNames("input-group-text btn-primary", {
              disabled: loading,
            })}
            id="basic-addon2"
            role="button"
            onClick={handleClick}
            aria-disabled={loading}
            disabled={loading}
          >
            Submit
          </button>
        </div>
        <div>
          <i>Format: https://www.linkedin.com/in/username</i>
        </div>
        <div>
          <br />
          <h4>Link: </h4>
          <div>{linkedInUrl}</div>
          <br />
          <h4>Results: </h4>
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div>
              {Array.isArray(linkedInData) ? (
                <ul className="list-group">
                  {linkedInData.map((r) => (
                    <li className="list-group-item">
                      <span className="d-block p-2">Name: <i>{r.title}</i></span>
                      <span className="d-block p-2">Description: <i>{r.description}</i></span>
                      <span className="d-block p-2">Date Posted: <i>{r.date_posted}</i></span>
                      <p>{r.comments}</p>
                    </li>
                  ))}
                </ul>
              ) : <p>{JSON.stringify(linkedInData)}</p>} 
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
