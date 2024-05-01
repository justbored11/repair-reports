import { Check } from "lucide-react";

export default function UploadStatusBar({
  status,
  progress,
}: {
  status: string;
  progress: number;
}) {
  return (
    <div>
      <section className=" flex flex-col items-center h-1/8">
        {/* upload progress bar */}
        {status == "UPLOADING" && (
          <div className="">
            <span className="loading loading-spinner text-accent"></span>
            <progress
              className="progress progress-accent w-56"
              value={progress}
              max="100"></progress>
          </div>
        )}

        {/* uploaded success badge */}
        {status == "SUCCESS" && (
          <div className="badge bg-green-500 text-black absolute left-0">
            <Check className=" text-slate-800" /> uploaded
          </div>
        )}

        {/* error alert strip */}
        {status == "ERROR" && (
          <div
            role="alert"
            className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Upload Failed</span>
          </div>
        )}
      </section>
    </div>
  );
}
