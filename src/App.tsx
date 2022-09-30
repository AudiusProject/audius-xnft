import ReactXnft, { Iframe, View } from "react-xnft";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {
  return (
    <View
      style={{
        padding: 8,
        display: "flex",
        maxWidth: "100%",
        minHeight: "100%",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Iframe
        src="https://audius.co/embed/playlist/DOPRl?flavor=card"
        style={{
          position: "relative",
          flex: 1,
          boxShadow:
            "0 2px 5px rgba(133,129,153,0.25),0 1px 0 #E3E3E3,0 0 1px rgba(133,129,153,.1)",
          borderRadius: 12,
        }}
      ></Iframe>
    </View>
  );
}
