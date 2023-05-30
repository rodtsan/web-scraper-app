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
  let timer:NodeJS.Timeout;
  const typeWriter = () => {
    timer = setTimeout(typeWriter, 1000);
    const span = document.querySelector('.dot') as HTMLSpanElement
    if (span.innerHTML.length < 5) {
      span.innerHTML += '.';
    } else {
      span.innerHTML = '.'
    }
  };

  React.useEffect(() => {
    if (loading) {
      typeWriter();
    } else {
      clearTimeout(timer)
    }
  }, [loading]);

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
        <h2>
          Web scrape your <span className="linkedin">LinkedIn</span> page here:
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
          <code>Format: https://www.linkedin.com/in/{"{username}"}</code>
          <span className="d-block">
            Click <Link href="/linkedin/list">here</Link> to LinkedIn profiles
          </span>
        </div>
        <div>
          <br />
          {loading ? (
            <>
              <div>
                <span>
                  Scraping page {linkedInUrl} <span className="dot">...</span>
                </span>
              </div>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          ) : (
            <div>
              <h4>Results: </h4>
              <JsonViewer value={linkedInData} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
