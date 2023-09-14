import React from "react";

import { Progress } from "@acme/ui";

const FileItem = ({
  file,
  uploadPercent,
  onFileDelete,
}: {
  file: any;
  uploadPercent?: number;
  onFileDelete: () => void;
}) => {
  return (
    <div
      className={`my-3 flex items-center justify-between rounded border border-zinc-400 bg-zinc-300/20 px-3 py-2`}
    >
      <div className="flex w-[90%] items-center gap-2">
        <IconFile />
        <div className="w-[86%]">
          <span className="flex gap-x-1">
            <p className="max-w-[80%] truncate text-zinc-200 ">{file.name}</p>
            <span>({file.sizeReadable})</span>
            {uploadPercent! > 0 && (
              <span className="ml-auto">{uploadPercent}%</span>
            )}
          </span>
          <>
            {uploadPercent! > 0 && (
              <Progress className="my-1 w-full" value={uploadPercent} />
            )}
          </>
        </div>
      </div>

      <button onClick={onFileDelete}>
        <IconClose />
      </button>
    </div>
  );
};

const IconFile = () => {
  return (
    <svg
      className="min-w-[24px]"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0625 10.5H13.5C12.9033 10.5 12.331 10.2629 11.909 9.84099C11.4871 9.41903 11.25 8.84674 11.25 8.25V1.6875C11.25 1.63777 11.2302 1.59008 11.1951 1.55492C11.1599 1.51975 11.1122 1.5 11.0625 1.5H6.75C5.95435 1.5 5.19129 1.81607 4.62868 2.37868C4.06607 2.94129 3.75 3.70435 3.75 4.5V19.5C3.75 20.2956 4.06607 21.0587 4.62868 21.6213C5.19129 22.1839 5.95435 22.5 6.75 22.5H17.25C18.0456 22.5 18.8087 22.1839 19.3713 21.6213C19.9339 21.0587 20.25 20.2956 20.25 19.5V10.6875C20.25 10.6378 20.2302 10.5901 20.1951 10.5549C20.1599 10.5198 20.1122 10.5 20.0625 10.5Z"
        fill="white"
      />
      <path
        d="M19.6509 8.84013L12.9098 2.09904C12.8967 2.08601 12.8801 2.07714 12.8619 2.07356C12.8438 2.06997 12.825 2.07183 12.8079 2.07889C12.7908 2.08595 12.7762 2.09791 12.7659 2.11326C12.7556 2.1286 12.7501 2.14665 12.75 2.16513V8.24998C12.75 8.44889 12.829 8.63966 12.9697 8.78031C13.1103 8.92096 13.3011 8.99998 13.5 8.99998H19.5848C19.6033 8.9999 19.6214 8.99436 19.6367 8.98405C19.6521 8.97375 19.664 8.95913 19.6711 8.94205C19.6781 8.92497 19.68 8.90618 19.6764 8.88805C19.6728 8.86991 19.664 8.85324 19.6509 8.84013Z"
        fill="white"
      />
    </svg>
  );
};

const IconClose = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.08855 0.072998C3.67043 0.072998 0.0759277 3.66751 0.0759277 8.08562C0.0759277 12.5037 3.67043 16.0982 8.08855 16.0982C12.5067 16.0982 16.1012 12.5037 16.1012 8.08562C16.1012 3.66751 12.5067 0.072998 8.08855 0.072998ZM10.9897 10.1154C11.0493 10.172 11.097 10.24 11.1299 10.3154C11.1629 10.3908 11.1804 10.472 11.1814 10.5543C11.1825 10.6366 11.1671 10.7182 11.1361 10.7944C11.1051 10.8706 11.0591 10.9399 11.001 10.998C10.9428 11.0562 10.8736 11.1021 10.7973 11.1331C10.7211 11.1641 10.6395 11.1796 10.5572 11.1785C10.475 11.1774 10.3938 11.1599 10.3184 11.127C10.243 11.0941 10.1749 11.0464 10.1183 10.9867L8.08855 8.95737L6.05881 10.9867C5.94228 11.0974 5.78711 11.1582 5.62639 11.1562C5.46567 11.1541 5.31211 11.0894 5.19845 10.9757C5.0848 10.8621 5.02004 10.7085 5.01798 10.5478C5.01592 10.387 5.07673 10.2319 5.18744 10.1154L7.21679 8.08562L5.18744 6.05588C5.07673 5.93935 5.01592 5.78419 5.01798 5.62346C5.02004 5.46274 5.0848 5.30918 5.19845 5.19553C5.31211 5.08187 5.46567 5.01711 5.62639 5.01505C5.78711 5.01299 5.94228 5.0738 6.05881 5.18451L8.08855 7.21386L10.1183 5.18451C10.2348 5.0738 10.39 5.01299 10.5507 5.01505C10.7114 5.01711 10.865 5.08187 10.9786 5.19553C11.0923 5.30918 11.1571 5.46274 11.1591 5.62346C11.1612 5.78419 11.1004 5.93935 10.9897 6.05588L8.9603 8.08562L10.9897 10.1154Z"
        fill="white"
      />
    </svg>
  );
};

export default FileItem;
