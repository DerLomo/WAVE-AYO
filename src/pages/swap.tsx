import type { NextPage } from "next";
import Head from "next/head";
import { ComingSoonView } from "../views";

const Swap: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>A-YO</title>
        <meta
          name="description"
          content="A-YO"
        />
      </Head>
      <ComingSoonView />
    </div>
  );
};

export default Swap;
