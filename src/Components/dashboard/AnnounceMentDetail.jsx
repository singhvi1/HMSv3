import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft, Link, Paperclip } from "lucide-react";

const AnnouncementDetail = () => {
  // const AnnouncementDetail = ({ announcement }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // temporary dummy data (later API)
  const announcement = {
    id,
    title: "Testing Single Announcement title ",
    message:
      "Water supply will be interrupted tomorrow from 10 AM to 2 PM due to maintenance work.",
    date: "24 Dec 2025",
    notice_url: "https://example.com/notice.pdf",
    attachment: "maintenance.pdf"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          {announcement.title}
        </h1>

        <p className="text-sm text-gray-500">
          Published on {announcement.date} by <b>{"Admin Name"}</b>
        </p>

        {/* Message */}
        <p className="text-gray-700 leading-relaxed">
          {announcement.message}
        </p>

        
        

        {announcement.attachment && (
          <p className="text-sm text-gray-600">
            <Paperclip size={18} className="inline m-1 opacity-50"/> {announcement.attachment}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={() =>
              navigate(`/admin/ann/${id}/edit`, {
                state: announcement
              })}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">
            <Pencil size={16} />
            Edit
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700">
            <Trash2 size={16} />
            Delete
          </button>


        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;

