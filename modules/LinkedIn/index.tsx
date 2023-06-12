import React from "react";
import classNames from "classnames";
import { JsonViewer } from "@textea/json-viewer";
import Layout from "@/components/Layout";

interface LinkedInProps {
  linkedin_authors?: [];
  error?: string;
  apiEndpoint: string;
}

interface LinkedInResponse {
  name?: string;
  description?: string;
  link?: string;
  posts?: {
    name?: string;
    description?: string;
    posted_by?: string;
    date_posted?: string;
    comments?: string;
  }[];
}

export default function LinkedIn({ apiEndpoint }: LinkedInProps) {
  const [linkedInUrl, setLinkedUrl] = React.useState("");
  const [linkedInData, setLinkedInData] = React.useState<LinkedInResponse>({
    posts: [],
  });
  const [loading, setLoading] = React.useState(false);

  function linkedInFetch(url: string) {
    setLoading(true);
    setLinkedInData({});
    fetch(`${apiEndpoint}/api/linkedin/web-scrape-page?url=${decodeURI(url)}`, {
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

  const handleCopy = (event: React.MouseEvent<HTMLElement, Event>) => {
    navigator.clipboard.writeText(JSON.stringify(linkedInData));
  };

  return (
    <Layout>
      <div className="linkedin_page">
        <h2>
          Web scrape your <span className="t-linkedin">LinkedIn</span> page
          here:
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
          <code className="text-dark">
            Example: https://www.linkedin.com/in/{"{username}"}
          </code>
        </div>
        <div>
          <br />
          {loading ? (
            <>
              <div>
                <span>Web Scraping page {linkedInUrl}... &nbsp;</span>
                <span className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </span>
              </div>
            </>
          ) : (
            <div>
              <div className="json-viewer">
                <JsonViewer value={linkedInData} rootName={false} />
                <span
                  title="copy"
                  className="btn copy-icon"
                  role="button"
                  onClick={handleCopy}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clipboard"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
