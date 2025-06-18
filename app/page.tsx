import ChatInterface from "./components/ChatInterface";
import LiveRoom from "./room/[room]/LiveRoom";

export default async function Page() {
  const res = await fetch(
    `http://localhost:3000/api/livekit-token?userId=user123&room=lawyer-room`
  );

  if (!res.ok) {
    console.error("Failed to fetch token:", res.statusText);
    return <div>Error fetching token</div>;
  }

  const data = await res.json();

  if (!data.token) {
    console.error("No token received");
    return <div>No token received</div>;
  }

  return (
    <div>
      <LiveRoom token={data.token} />
      <div className="h-screen">
        <ChatInterface/>
      </div>
    </div>
  );
}
