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
  const [message, setMessage] = React.useState<string | null>(null);
  const [transcriptData, setTranscriptData] = React.useState({});
  const [audioFile, setAudioFile] = React.useState<AudioFile>({});
  const [loading, setLoading] = React.useState(false);

  const audio_formats = [
    "pdf",
    "m4a",
    "mp3",
    "webm",
    "mp4",
    "mpga",
    "wav",
    "mpeg",
  ];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (audio_formats.includes(ext!)) {
          setLoading(true);
          setMessage("Uploading audio file...");
          setErrorMessage("");
          const data = new FormData();
          data.append("file", file);
          setTimeout(() => {
            fetch("http://127.0.0.1:5000/api/audio/upload", {
              method: "POST",
              body: data,
            })
              .then((r) => r.json())
              .then((t) => {
                if (t.filename) {
                  setAudioFile(t);
                  setLoading(true);
                  setMessage("Transcripting audio to text...");
                  fetch(
                    `http://127.0.0.1:5000/api/transcribe-audio-to-text?file=${t.filename}`,
                    {
                      method: "GET",
                    }
                  )
                    .then((r) => r.json())
                    .then(setTranscriptData)
                    .catch((e) => setErrorMessage(e.message))
                    .finally(() => {
                      setLoading(false);
                      setMessage(null);
                    });
                }
              })
              .catch((e) => {
                setErrorMessage(e.message);
                setMessage(null);
                setAudioFile({});
                setLoading(false);
              });
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
        <h2>Transcribe Audio to Text</h2>
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
            Supported audio formats: <i>{audio_formats.join(", ")}</i>
          </div>
        </section>
        <div>
          <br />
          <span className="h4 text-danger">{errorMessage}</span>
          <br />
          {loading ? (
            <div>
              <span>{message}</span>
              <span className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </span>
            </div>
          ) : (
            <div>
              <div className="audio-player">
                {audioFile && audioFile?.filename && (
                  <audio controls={false}>
                    <source
                      src={`http://127.0.0.1:5000/temp/${audioFile?.filename}`}
                      type={audioFile?.content_type}
                    />
                    <source src="horse.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
              <div className="json-viewer vh-20">
                <JsonViewer value={transcriptData} rootName={false} />
                <span title="copy" className="btn copy-icon" role="button">
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
