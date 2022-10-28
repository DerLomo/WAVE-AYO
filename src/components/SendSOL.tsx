import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Keypair, SystemProgram, Transaction, TransactionSignature, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { notify } from "../utils/notifications";

export const SendSOL: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        console.log("target", e.target.value)
        setAmount(e.target.value);
        setAmount((amt) => {
            console.log("refreshed amt", amount)
            return amt
        })
        console.log("amt", amount)
    }

    const onChange = useCallback(
        amt => {
            setAmount(amt.target.value)
        },
        [],
    )

    useEffect(() => {
        console.log("in useEffect amt", amount)
    },[amount]);

    const onClick = useCallback(async () => {
        console.log("click amt", amount)
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        let signature: TransactionSignature = '';
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey("556kSYry5jrzZujr6B8V2zGDfHC378fehiU49mYoTsXp"),
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, 'confirmed');
            console.log(signature);
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
            setAmount(0);
            console.log("end amt succ", amount)
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            console.log("end amt fail", amount)
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <div>
            <label className="label">
                <span className="label-text">Enter amount</span>
            </label>
            <label className="input-group-vertical">
                <input type="number" step="0.01" placeholder="0.01" className="input input-bordered" onChange={onChange}/>
            </label>
            <button className="btn btn-round animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block">
                    Connect your wallet
                </div>
                <span className="block group-disabled:hidden" > 
                    Deposit 
                </span>
            </button>
            <div className='my-3'>
                You are trying to deposit: {amount} SOL
            </div>
        </div>
    );

}

