import {
        ConnectButton,
        getDefaultWallets,
        RainbowKitProvider
    } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from '../styles/Home.module.css'
import { WHITELIST_WALLETS } from "../data/whitelisted_wallets";

const WHITELISTED_SET = new Set(WHITELIST_WALLETS.map((wallet) => wallet.toLowerCase()));

export default function Home() {
    const { address } = useAccount();
    const [pending, setPending] = useState(true);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        checkWhitelistStatus(address);
    }, [address])

    const checkWhitelistStatus = () => {
        if (address == null) {
            setPending(true);
            return;
        }
        setPending(false);
        setValid(WHITELISTED_SET.has(address.toLowerCase()));
    }

    const getWhitelistedOutput = () => {
        if (pending) {
            return null;
        }
        if (valid) {
            return <p className={styles.description}>You're whitelisted!</p>
        } else {
            return <p className={styles.description}>You're not whitelisted</p>
        }
    }

    return (
        <>
            <ConnectButton showBalance={false}/>
            <br />
            {getWhitelistedOutput()}
        </>
    );
}
