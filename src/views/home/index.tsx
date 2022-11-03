// Next, React
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AYORange from '../../../public/ayoRange.jpeg'

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
        <h2 className="md:w-full text-center text-slate-300">
          <p className='text-center text-4xl font-bold'>Arbitrage Yield Optimizer</p>
          <p className='text-center md:w-full my-2'>Get the best APY of Solana with our next level strategies</p>
        </h2>
        <h4 className="md:w-full text-center text-slate-300 my-4">
          <p className='text-center text-4xl my-5'>How does it work?</p>
          <p className='text-center md:w-full text-slate-300 my-10'>
            A-YO will feature at the moment of launching two different arbitrage strategies based on the liquidity conditions of the decentralized exchanges we are monitoring   
          </p>
          <p className='text-center md:w-full text-slate-300 my-10'>
            The most stable strategy is based on arbitraging different versions of liquid staked SOL (mSOL, stSOL, ...) between them and between the different DEXs that feature
            pools with these pairs. With this strategy you will be able to earn validator rewards from the staked SOL on top of the revenue generated with the arbitrage, while 
            helping securing the blockchain and making markets more efficient
          </p>
          <p className='text-center md:w-full text-slate-300 my-10'>
            The second strategy A-YO is featuring consists of arbitraging token pairs with low liquidity pools, in which A-YO will be the main liquidity provider, so that the
            protocol recovers most of the fees paid to the pool. In this enviroment, A-YO profitable threshold is lower than the average arbitrage bot user, meaning that we can work 
            with tighter price differences since A-YO pays less fees to rebalance these pools
          </p>
          <Image
            src={AYORange}
            alt="A-YO profitable range"
            width={700}
            height={350}
          />  
        </h4>
        <p className='text-center text-4xl'>Are you running a validator?</p>
        <p className='text-center text-4xl'>Are you interested in bootsrapping liquidity?</p>
        <p className='text-center text-4xl'>Contact us!</p>    
          {/*<div className="text-center">
          <RequestAirdrop />
           {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>}
          {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
          </div>*/}
      </div>
    </div>
  );
};
