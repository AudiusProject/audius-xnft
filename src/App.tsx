import { useEffect, useState } from "react";
import ReactXnft, { Iframe, useConnection, usePublicKey, View, Image } from "react-xnft";
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { HODL_TO_UNLOCK } from "./Constants"

const AUDIO_MINT_PUBLIC_KEY = new PublicKey('9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM')

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {
  const [isHodler, setIsHodler] = useState<boolean | null>(null)
  const connection = useConnection()
  const publicKey = usePublicKey()
  useEffect(() => {
    if (connection) {
      const work = async () => {
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { mint: AUDIO_MINT_PUBLIC_KEY })
        const wAudioTokenAccountPubkey = tokenAccounts?.value?.[0]?.pubkey ?? undefined
        if (wAudioTokenAccountPubkey) {
          const tokenAccountBalance = await connection.getTokenAccountBalance(wAudioTokenAccountPubkey)
          const stringBalance = tokenAccountBalance?.value?.amount ?? '0'
          const balance = new BN(stringBalance)
          if (balance.gte(new BN('100000000'))) {
            setIsHodler(true)
            return
          }
        }
        setIsHodler(false)
      }
      work()
    }
  }, [connection, setIsHodler])

  return (
    <View
      style={{
        padding: 8,
        display: "flex",
        maxWidth: "100%",
        minHeight: "100%",
        flexDirection: "column",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {
        isHodler === false &&
          <View
            style={{
              position: "absolute",
              zIndex: 10
            }}
            >
              <Image
                style={{
                  width: 200,
                  height: 200,
                }}
                src={HODL_TO_UNLOCK}
              />
          </View>
      }
      <View
        style={{
          backgroundColor: "white",
          opacity: isHodler ? 1 : 0.2,
          height: "100%",
          width: "100%",
          display: "flex",
          maxWidth: "100%",
          minHeight: "100%",
          flexDirection: "column",
          flex: 1
        }}
      >
        <Iframe
          src="https://audius.co/embed/playlist/DOPRl?flavor=card&fillContainer=true"
          style={{
            position: "relative",
            flex: 1,
            boxShadow:
              "0 2px 5px rgba(133,129,153,0.25),0 1px 0 #E3E3E3,0 0 1px rgba(133,129,153,.1)",
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
}
