import Guestbook from "@/app/components/Guestbook";

export default function Page() {
  return (
    <div className="p-6 pb-24 fade-in">
      <div className="glass rounded-3xl p-8 shadow-xl">
        <Guestbook />
      </div>
    </div>
  );
}
