// src/app/rsvp/page.tsx

import RSVP from "@/app/components/RSVP";

export default function Page() {
  return (
    <div className="px-4 pt-6 pb-24 max-w-xl mx-auto fade-in">
      <div className="glass rounded-2xl p-6 shadow-xl">
        <RSVP />
      </div>
    </div>
  );
}
