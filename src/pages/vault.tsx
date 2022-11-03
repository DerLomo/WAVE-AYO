import type { NextPage } from "next";
import Head from "next/head";
import { VaultView } from "../views";

const Vault: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>A-YO</title>
        <meta
          name="description"
          content="A-YO"
        />
      </Head>
      <VaultView />
    </div>
  );
};

export default Vault;
