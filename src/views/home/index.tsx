// Next, React
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-10 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          A-YO <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p className='text-center text-3xl my-5'>Arbitrage Yield Optimizer</p>
          Get the best APY% of Solana with our next level strategies
        </h4>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p className='text-center text-3xl my-5'>How it works?</p>
         A-YO strategies are based on how high can the vault's representation be in the liquidity pools, thanks to this % of PL in the vaults, 
         we increase the number of arbitrage opportunities as the cost for each arbitrage is reduced. 
        </h4>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          Therefore the more capital in the vaults, the more arbitrage opportunities, and so does the total APY%
        </h4>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          Get some Devnet SOL and try out our new features!
        </h4>    
          <div className="text-center">
          <RequestAirdrop />
          {/* {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>} */}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
};
