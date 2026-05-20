const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40">
        <h2 className="text-3xl font-semibold text-white">Settings</h2>
        <p className="mt-4 text-slate-300">
          AI search requests are now routed through a secure Firebase backend.
          Your Gemini API key is no longer stored in the browser.
        </p>
        <p className="mt-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-400">
          To make this work, deploy the Firebase function and configure the Gemini key in your backend environment. Use the Firebase console or Cloud Functions environment settings to set:
          <code className="mt-2 block rounded bg-slate-950 px-2 py-1 text-xs text-slate-200">
            GEMINI_API_KEY=YOUR_GEMINI_KEY
          </code>
          <br />
          When deploying the frontend to Netlify, set:
          <code className="mt-2 block rounded bg-slate-950 px-2 py-1 text-xs text-slate-200">
            VITE_AI_API_BASE=https://us-central1-pickmyflick-72ba5.cloudfunctions.net/api
          </code>
        </p>
      </div>
    </div>
  );
};

export default Profile;
