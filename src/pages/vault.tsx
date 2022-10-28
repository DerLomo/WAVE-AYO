import type { NextPage } from "next";
import Head from "next/head";
import { VaultView } from "../views";

const Vault: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Wave AYO</title>
        <meta
          name="description"
          content="Wave AYO"
        />
      </Head>
      <VaultView />
    </div>
  );
};

export default Vault;
