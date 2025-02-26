import SecondaryDeveloperCard from "@components/credits-page/SecondaryDeveloperCard";
import { secondaryDevelopers, primaryDevelopers } from "../data/data";
import PrimaryDeveloperCard from "@components/credits-page/PrimaryDeveloperCard";

export default function CreditsScreen({ navbar }: { navbar: JSX.Element }) {
  return (
    <>
      <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
        {navbar}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-white">
            The People Behind This Website
          </h1>
          <h3 className="mt-5 px-5 text-xl text-white">
            Partnering with WDCC's talented developers and designers to bring
            this site to life.
          </h3>
          <h3 className="px-5 text-xl text-white">
            Click{" "}
            <a
              href="https://wdcc.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-600"
            >
              here
            </a>{" "}
            to learn more about WDCC!
          </h3>
          <h2 className="text-tertiary-blue mt-10 text-3xl font-bold">
            Primary Developers
          </h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {primaryDevelopers.map((developer) => (
            <div className="m-5" key={developer.id}>
              <PrimaryDeveloperCard
                name={developer.name}
                linkedIn={developer.linkedIn}
                github={developer.github}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-tertiary-blue mt-10 text-3xl font-bold">
            Secondary Developers
          </h2>
          <div className="flex flex-wrap justify-center">
            {secondaryDevelopers.map((developer) => (
              <div key={developer.id} className="m-5">
                <SecondaryDeveloperCard
                  name={developer.name}
                  github={developer.github}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
