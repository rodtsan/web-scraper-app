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
}

export default function Converter() {
  const [errorMessage, setErrorMessage] = React.useState("");
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
          setTimeout(() => {
            fetch("http://127.0.0.1:5000/api/convert-audio-to-wav", {
              method: "POST",
              body: data,
            })
              .then((r) => r.json())
              .then(setAudioFile)
              .catch((e) => {
                setErrorMessage(e.message);
                setAudioFile({});
              })
              .finally(() => setLoading(false));
          }, 1000);
        } else {
          setErrorMessage("Unsupported audio format");
          return;
        }
      }
    },
  });

  return (
    <Layout>
      <div className="transcribe-audio-to-text">
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
          <span className="h4 text-danger">{errorMessage}</span>
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
                    <audio controls={true} src={`http://127.0.0.1:5000/temp/${audioFile?.filename}`}>
                      Your browser does not support the audio element.
                    </audio>
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