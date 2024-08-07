import { DeveloperCardProps } from "../types/types";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <>
      <div className="bg-AUIS-dark-teal flex h-auto w-64 flex-col items-center rounded-xl p-2">
        <h1 className="text-xl font-bold text-white">{developer.name}</h1>
        <div className="flex justify-center my-2 items-center">
          <a
            href={developer.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full px-4 items-center justify-center"
          >
            <FaLinkedin className="h-10 w-10 text-white group-hover:text-black" />
          </a>

          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-full w-full px-4 items-center justify-center"
          >
            <FaGithub className="h-10 w-10 text-white group-hover:text-black" />
          </a>
        </div>
      </div>
    </>
  );
}
