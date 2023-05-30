import React from "react";
import classNames from "classnames";
import { JsonViewer } from "@textea/json-viewer";
import Layout from "@/components/Layout";

interface LinkedInProps {
  linkedin_authors?: LinkedInResponse[];
  error?: string;
}

interface LinkedInResponse {
  id?: string;
  name?: string;
  description?: string;
  link?: string;
  date_added?: string;
  posts?: {
    name?: string;
    description?: string;
    posted_by?: string;
    comments?: string;
    date_posted?: string;
  }[];
  error?: string;
}

export default function List(props: LinkedInProps) {
  const authors = props.linkedin_authors || [];

  const handleToggleClick = (
    event: React.MouseEvent<HTMLButtonElement, Event>
  ) => {
    const target = event.currentTarget;
    const row = event.currentTarget?.parentElement?.parentElement;
    const next = row?.nextElementSibling;
    const parent = row?.parentElement;
    Array.prototype.forEach.call(
      parent?.childNodes,
      (child: HTMLTableRowElement) => {
        if (child.classList.contains("row-posts")) {
          if (child == next) {
            if (child.classList.contains("show")) {
              child.classList.remove("show");
            } else {
              child.classList.add("show");
            }
          } else {
            child.classList.remove("show");
          }
        } else {
          const btn = child.firstChild?.firstChild as HTMLButtonElement;
          if (btn === target) {
            if (btn.classList.contains("arrow-up")) {
              btn.classList.replace("arrow-up", "arrow-down");
            } else {
              btn.classList.replace("arrow-down", "arrow-up");
            }
          } else {
            btn.classList.replace("arrow-up", "arrow-down");
          }
        }
      }
    );
  };
  return (
    <Layout>
      <div className="linkedin-list">
        <h2>LinkedIn Profiles</h2>
        <br />
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Link</th>
                <th scope="col" className="col-hide">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.map((r, key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td>
                      {r.posts && r.posts.length > 0 && (
                        <button
                          type="button"
                          className="btn arrow-button arrow-down"
                          aria-label={r.id}
                          onClick={handleToggleClick}
                        >
                          <span className="visually-hidden">Button</span>
                        </button>
                      )}
                    </td>
                    <th scope="row">{r.id}</th>
                    <td><span title={r.name} className="_ellipsis fw-bold">{r.name}</span></td>
                    <td><span title={r.description} className="_ellipsis">{r.description}</span></td>
                    <td><span title={r.description} className="_ellipsis">{r.link}</span></td>
                    <td className="col-hide"><span title={r.date_added} className="_ellipsis">{new Date(Date.parse(r.date_added || '')).toDateString()}</span></td>
                  </tr>
                  <>
                    {r.posts && r.posts.length > 0 && (
                      <tr className="row-posts">
                        <td>{}</td>
                        <td colSpan={5}>
                          <div className="posts-wrapper">
                            {r.posts.map((p, k) => (
                              <React.Fragment key={k}>
                                <div>
                                  {p.posted_by && <span>{p.posted_by}</span>}
                                  <span className="d-block fw-bold">
                                    {p.name}
                                  </span>
                                  <span className="d-block">
                                    {p.description}
                                  </span>
                                  <br />
                                  <p>{p.comments}</p>
                                </div>
                                <hr className="divider" />
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
