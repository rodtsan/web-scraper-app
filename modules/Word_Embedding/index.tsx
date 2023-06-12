import React, { ChangeEvent, useCallback, useState } from "react";
import classNames from "classnames";
import Layout from "@/components/Layout";
import { SYMANTIC_SEARCH } from "@/common/gqlTags/queries";
import { useQuery } from "@apollo/client";
import { SymanticSearchData, Topic } from "@/common/models";
import { GraphQLError } from "graphql";
import { isEmpty } from "lodash";

interface WordEmbeddingProps {
  topics: Topic[];
  loading?: boolean;
  error?: GraphQLError;
}

interface SearchInput {
  searchText?: string;
  csvFile?: string;
}

export default function WordEmbedding({ topics }: WordEmbeddingProps) {
  const [isLess, setIsLess] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>(
    topics[0]
  );
  const _searchInputRef = React.useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState<SearchInput>({
    csvFile: selectedTopic?.csv_file,
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    data,
    loading,
    error: errors,
  } = useQuery<SymanticSearchData>(SYMANTIC_SEARCH, {
    fetchPolicy: "cache-and-network",
    variables: {
      ...searchInput,
    },
    skip: isEmpty(searchInput.csvFile) || isEmpty(searchInput.searchText),
  });

  const handleSearchClick = (
    event: React.MouseEvent<HTMLButtonElement, Event>
  ) => {
    setSearchInput((prevState) => ({
      ...prevState,
      searchText: searchValue,
    }));
  };

  const handleOpenBrowserClick =
    (embedding?: string) =>
    (event: React.MouseEvent<HTMLButtonElement, Event>) => {
      if (embedding) {
        const blob = new Blob([embedding], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    };

  const handleMoreOrLessClick = (
    event: React.MouseEvent<HTMLButtonElement, Event>
  ) => {
    setIsLess((prevState) => !prevState);
  };

  const handleSelectedTopicClick =
    (topic?: Topic) => (event: React.MouseEvent<HTMLButtonElement, Event>) => {
      setSelectedTopic(topic);
      setSearchInput({
        csvFile: topic?.csv_file,
      });
      setSearchValue("");
    };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Layout>
      <div className="word_embedding_page">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <h3 className="fw-bold">Topics</h3>
            <ul className="nav flex-column">
              {topics?.map((r, k) => (
                <li key={k} className="nav-item">
                  <button
                    className={classNames("btn btn-link nav-link shadow-none", {
                      "text-dark": selectedTopic?.id !== r.id,
                    })}
                    onClick={handleSelectedTopicClick(r)}
                  >
                    {r.title}
                  </button>
                </li>
              ))}
            </ul>
            <br />
            <br />
          </div>
          <div className="col-md-12 col-lg-8">
            <h3 className="fw-bold">OpenAI Word Embeddings, Semantic Search</h3>
            <br />
            <div className={classNames("ellipsis_multi", { more: isLess })}>
              Word embeddings semantic search is a technique used in natural
              language processing (NLP) that enables search based on the meaning
              of words rather than exact matches. It uses word embeddings, which
              are vector representations of words, to capture semantic
              relationships and contextual information. By comparing the vector
              representations of search queries and documents, it can retrieve
              relevant results that may not have exact keyword matches. This
              approach improves search accuracy and is applicable in various
              domains such as information retrieval, recommendation systems, and
              question answering.
              <button
                className="btn btn-link text-decoration-none more_or_less"
                onClick={handleMoreOrLessClick}
              >
                {isLess ? "less" : "more"}
              </button>
            </div>
            <br />
            <div className="topic_title">
              <h3>{selectedTopic?.title}</h3>
              <a
                className="nav-link text-decoration-none topic_csv_file"
                href={`http://localhost:5000/api/download_csv_zip/${selectedTopic?.csv_file}`}
                download
              >
                {selectedTopic?.csv_file}&nbsp;
                <span className="fa fa-download"></span>
              </a>
            </div>
            <br />
            <div className="input-group mb-3">
              <span className="input-group-text bg-white" id="basic-addon1">
                Search
              </span>
              <input
                ref={_searchInputRef}
                type="text"
                className="form-control"
                placeholder={`e.g. ${selectedTopic?.search_text}`}
                aria-label=""
                value={searchValue}
                aria-describedby="basic-addon2"
                onChange={handleValueChange}
                disabled={loading}
              />
              <button
                className={classNames("input-group-text btn-primary", {
                  disabled: loading,
                })}
                id="basic-addon2"
                role="button"
                onClick={handleSearchClick}
                aria-disabled={loading}
                disabled={loading}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div>
              <code className="topic_search text-dark">
                {selectedTopic?.search_title}: {selectedTopic?.search_text}
              </code>
            </div>
            <br />
            <div className="table_wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Text</th>
                    <th scope="col">Embedding</th>
                    <th scope="col">Similarities</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.symantic_search &&
                    data?.symantic_search?.map((r, key) => (
                      <tr>
                        <th scope="row">{r.index}</th>
                        <td>
                          <span title={r.text} className="_ellipsis_4l">
                            {r.text}
                          </span>
                        </td>
                        <td>
                          <span className="_ellipsis">
                            Large Text{" "}
                            <button
                              title="Open in new browser"
                              className="btn"
                              onClick={handleOpenBrowserClick(r?.embedding)}
                            >
                              <i className="fa fa-globe"></i>
                            </button>
                          </span>
                        </td>
                        <td>
                          <span title={r.similarities} className="_ellipsis">
                            {r.similarities}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && (
                <span className="spinner-wrapper">
                  <span className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        {JSON.stringify(errors)}
      </div>
    </Layout>
  );
}
