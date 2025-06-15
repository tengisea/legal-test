// app/room/page.tsx
import LiveRoom from "./[room]/LiveRoom";

export default async function RoomPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/livekit-token?userId=user123&room=testroom`,
    { cache: "no-store" }
  );
  const { token } = await res.json();

  return <LiveRoom token={token} />;
}
