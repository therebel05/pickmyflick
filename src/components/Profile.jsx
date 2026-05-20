const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40">
        <h2 className="text-3xl font-semibold text-white">Settings</h2>
        <p className="mt-4 text-slate-300">
          AI search requests are now routed through a secure Netlify Function backend.
          Your API key is no longer stored in the browser.
        </p>
        <p className="mt-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-400">
          To make this work, deploy the Netlify site and configure the Hugging Face key in Netlify environment variables:
          <code className="mt-2 block rounded bg-slate-950 px-2 py-1 text-xs text-slate-200">
            HUGGINGFACE_API_KEY=YOUR_HUGGINGFACE_KEY
          </code>
          <br />
          If you want to use a custom remote endpoint for the frontend, set:
          <code className="mt-2 block rounded bg-slate-950 px-2 py-1 text-xs text-slate-200">
            VITE_AI_API_BASE=https://your-site.netlify.app/api
          </code>
        </p>
      </div>
    </div>
  );
};

export default Profile;
