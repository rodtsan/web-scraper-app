import Layout from "@/components/Layout";
import { useDropzone } from "react-dropzone";
import { JsonViewer } from "@textea/json-viewer";
import React from "react";
import classNames from "classnames";

interface AudioFile {
  job_id?: string;
  filename?: string;
  content_type?: string;
  message?: string;
  ok?: boolean;
}

interface ConvertAudioToWavProps {
  apiEndpoint: string;
}

// const apiEndpoint = String(process.env.NEXT_PUBLIC_BACKEND_API)

export default function ConvertAudioToWav({
  apiEndpoint,
}: ConvertAudioToWavProps) {
  const [errorMessage, setErrorMessage] = React.useState<any>();
  const [audioFile, setAudioFile] = React.useState<AudioFile>({});
  const [loading, setLoading] = React.useState(false);

  const audio_formats = ["ogg", "opus"];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (audio_formats.includes(ext!)) {
          setLoading(true);
          setErrorMessage("");
          const data = new FormData();
          data.append("file", file);
          fetch(`${apiEndpoint}/api/convert_audio_to_wav`, {
            method: "POST",
            // mode: "no-cors",
            // headers: {
            //   "content-type": "multipart/form-data"
            // },
            body: data,
          })
            .then((r) => r.json())
            .then(setAudioFile)
            .catch(setErrorMessage)
            .finally(() => setLoading(false));
        } else {
          setErrorMessage("Unsupported audio format");
          return;
        }
      }
    },
  });

  return (
    <Layout>
      <div className="convert_audio_to_wav_page">
        <h2>Convert Audio to WAV format</h2>
        <br />
        <section
          className={classNames("dropzone-container", { hidden: loading })}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              {...getInputProps({
                accept: audio_formats.map((f) => `audio/${f}`).join(", "),
                multiple: false,
              })}
            />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <span className="upload-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-upload"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>
            </span>
          </div>
          <div>
            Convert from any of these formats only:{" "}
            <i>{audio_formats.join(", ")}</i>
          </div>
        </section>
        <div>
          <br />
          <span className="h4 text-danger">{JSON.stringify(errorMessage)}</span>
          <br />
          {loading ? (
            <div>
              <span>Converting audio file to wav...</span>
              <span className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </span>
            </div>
          ) : (
            <div>
              <div className="audio-player">
                {audioFile?.filename && (
                  <>
                    <audio
                      controls={true}
                      src={`${apiEndpoint}/api/download_audio_file/${audioFile?.filename}`}
                    >
                      Your browser does not support the audio element.
                    </audio>
                    <br />
                    <br />
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span className="label">Name:</span>
                        <span>{audioFile.filename}</span>
                      </li>
                      <li className="list-group-item">
                        <span className="label">Type:</span>
                        <span>{audioFile.content_type}</span>
                      </li>
                      <li className="list-group-item">
                        <a
                          download
                          href={`${apiEndpoint}/api/download_audio_file/${audioFile?.filename}`}
                          className="text-decoration-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-upload"
                            viewBox="0 0 16 16"
                          >
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                          </svg>
                          <span>&nbsp;Download</span>
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
