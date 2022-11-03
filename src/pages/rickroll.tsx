import type { NextPage } from "next";
import Head from "next/head";
import rickRoll from "../../public/rickRoll.jpeg"
import Image from "next/image";

const RickRoll: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>A-YO</title>
        <meta
          name="description"
          content="A-YO"
        />
      </Head>
      <div className="md:hero mx-auto my-20">
      <Image
      src={rickRoll}
      alt="RickRoll"
      />
      </div>
    </div>
  );
};

export default RickRoll;
