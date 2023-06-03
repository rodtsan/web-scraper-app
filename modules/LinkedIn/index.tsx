import React from "react";
import classNames from "classnames";
import { JsonViewer } from "@textea/json-viewer";
import Layout from "@/components/Layout";
import Link from "next/link";
import { join } from "path";

interface LinkedInProps {
  linkedin_authors?: [];
  error?: string;
}

interface LinkedInResponse {
  name?: string;
  description?: string;
  posts?: { date_posted?: string; comments?: string }[];
  error?: string;
}

export default function LinkedIn(props: LinkedInProps) {
  const [linkedInUrl, setLinkedUrl] = React.useState("");
  const [linkedInData, setLinkedInData] = React.useState<LinkedInResponse>({
    posts: [],
  });
  const [loading, setLoading] = React.useState(false);


  function linkedInFetch(url: string) {
    setLoading(true);
    setLinkedInData({});
    fetch(`http://104.207.133.48:5000/api/linkedin?url=${decodeURI(url)}`, {
      method: "GET",
      // mode: 'no-cors',
      // headers: {
      //   "Content-Type": "application/json",
      // },
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
        <h2>
          Web scrap your <span className="linkedin">LinkedIn</span> page here:
        </h2>
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
          <code className="text-dark">Example: https://www.linkedin.com/in/{"{username}"}</code>
        </div>
        <div>
          <br />
          {loading ? (
            <>
              <div>
                <span>
                  Scraping page {linkedInUrl} &nbsp;
                </span>
                <span className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </span>
              </div>
            </>
          ) : (
            <div>
              <code className="text-dark h4">Results:</code>
              <JsonViewer value={linkedInData} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
