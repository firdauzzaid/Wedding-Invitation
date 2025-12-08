import Details from "@/app/components/Details";
import ShareInvite from "@/app/components/ShareInvite";
import MapLocation from "@/app/components/MapLocation";

export default function Page() {
  return (
    <div className="p-6 pb-24 fade-in">
      <div className="glass rounded-3xl p-8 shadow-xl">
        <Details />
      </div>
      <div className="glass rounded-3xl p-8 shadow-xl">
        <MapLocation />
      </div>
      <div className="glass rounded-3xl p-8 shadow-xl">
        <ShareInvite />
      </div>
    </div>
  );
}
