import { Folder } from "lucide-react";

function Notebooks(){

const books=[
"Personal",
"Work",
"College",
"Ideas"
];

return(

<div className="min-h-screen bg-slate-100 p-8">

<h1 className="text-4xl font-bold mb-8">

Notebooks

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

{books.map((book)=>(

<div
key={book}
className="bg-white rounded-2xl shadow p-8 hover:shadow-xl transition cursor-pointer">

<Folder
size={50}
className="text-indigo-600"/>

<h2 className="text-2xl font-bold mt-5">

{book}

</h2>

</div>

))}

</div>

</div>

);

}

export default Notebooks;