import { Plus } from "lucide-react";

export default function AddSemesterButton() {
  return (
    <a
      href="/semesters/create"
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-200 text-violet-800 font-medium shadow-sm 
                 hover:bg-violet-300 hover:shadow transition 
                 active:bg-violet-400 active:scale-95"
    >
      <Plus className="w-5 h-5" />
      Add a new semester
    </a>
  );
}