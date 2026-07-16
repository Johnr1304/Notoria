import { Moon, Download, Upload } from "lucide-react";
import api from "../services/api";

function Settings() {

const exportNotes = async()=>{

const user=JSON.parse(localStorage.getItem("currentUser"));

const res=await api.get(`/notes?userId=${user.id}`);

const data=JSON.stringify(res.data,null,2);

const blob=new Blob([data],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="notoria-notes.json";

a.click();

};

const importNotes = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (event) => {

    const notes = JSON.parse(event.target.result);

    for (const note of notes) {

      await api.post("/notes", note);

    }

    alert("Notes Imported Successfully");

  };

  reader.readAsText(file);

};

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-10">

        Settings

      </h1>

      <div className="bg-white rounded-2xl p-8 shadow space-y-6">

        <button className="flex items-center gap-3 bg-indigo-600 text-white px-5 py-3 rounded-xl">

          <Moon size={20}/>

          Toggle Theme

        </button >

        <button onClick={exportNotes} className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl">

          <Download size={20}/>

          Export Notes

        </button>

        <label className="bg-yellow-500 text-white px-5 py-3 rounded-xl cursor-pointer flex items-center gap-3">

<Upload size={20}/>

Import Notes

<input
type="file"
hidden
accept=".json"
onChange={importNotes}
/>

</label>

      </div>

    </div>

  );

}

export default Settings;