import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold flex gap-2 md:text-5xl justify-center items-center text-3xl">
          Get Me a Chai{" "}
          <span>
            <img src="/tea.gif" width={70} alt="" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="text-center md:text-left">
          A place where your fans can buy you a chai. unleash the power of your fans and get your projects funded.
        </p>
        <div>
          <Link href={"/login"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          </Link>

          <Link href={"/about"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-slate-700  h-1 text-white "></div>
      <div className="text-white container mx-auto py-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your fans can buy you a chai
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-200 rounded-full p-2 text-black"
              src="/man.gif"
              width={88}
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              your fans are available for you to help you
            </p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-200 rounded-full p-2 text-black"
              src="/coin.gif"
              width={88}
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              your fans are available for you to help you
            </p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-200 rounded-full p-2 text-black"
              src="/group.gif"
              width={88}
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              your fans are available for you to help you
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-700  h-1 text-white "></div>

      <div className="text-white container mx-auto py-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn more about us
        </h2>
        <div>
          <iframe  src="https://www.youtube.com/embed/yFlarM35vxA?si=vNRCFgX2R8i2eBqM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        
      </div>
    </>
  );
}
