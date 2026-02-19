import { useState } from "react";

const Profile = () => {
  const [keyInput, setKeyInput] = useState(
    localStorage.getItem("user_gemini_key") || "",
  );

  const saveKey = () => {
    localStorage.setItem("user_gemini_key", keyInput);
    alert("API Key saved locally!");
  };

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h2>Settings</h2>
      <input
        type="password"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        placeholder="Enter Gemini API Key"
        className="bg-gray-800 p-2 rounded w-full"
      />
      <button onClick={saveKey} className="mt-4 bg-blue-600 px-4 py-2 rounded">
        Save Key
      </button>
    </div>
  );
};

export default Profile;
