import { ExecCardProps } from "../types/types"

export default function ExecCard({ exec }: ExecCardProps) {
  return (
    <>
            <div className="relative flex h-60 w-44 transform cursor-pointer flex-col items-center justify-between overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105">
             <div className="h-40 w-full overflow-hidden rounded-2xl px-2 pt-2">
          <img
            src={exec.image}
            alt="Exec Images"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <h1 className="text-xl font-bold text-black">{exec.name}</h1>
        <div className="bg-primary-orange flex h-10 w-full items-center justify-center">
          <p className="text-xl font-bold text-white">{exec.position}</p>
        </div>
        {/* Description Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="text-center text-black">{exec.description}</p>
        </div>
      </div>
    </>
  )
}
