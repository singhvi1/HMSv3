import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Paperclip } from "lucide-react";
import BackButton from "../common/ui/Backbutton";
import { formatDateTime } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { announcementService } from "../../services/apiService";
import { removeAnnouncement, selectAnnounceMentById, updateOneAnnouncement } from "../../utils/store/announcementsSlice";


const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const announcement = useSelector(selectAnnounceMentById(id))
  // console.log(announcement)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const deleteRef = useRef(false)

  useEffect(() => {
    if (deleteRef.current) return;
    const loadAnn = async () => {
      try {
        const res = await announcementService.getAnnouncementById(id);
        dispatch(updateOneAnnouncement(res.data.announcement))
      } catch (err) {
        console.error("Failed to load announcement", err);
      } finally {
        setLoading(false);
      }
    }

    // console.log("Announcemet detail page mounting ", id)
    if (!announcement) {
      loadAnn()
    } else {
      setLoading(false);
    }
  }, [dispatch, announcement, id])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading announcement...
      </div>
    );
  }
  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Announcement not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">
          {announcement?.title || ""}
        </h1>

        <p className="text-sm text-gray-500">
          published On : <span>
            {formatDateTime(
              announcement?.updatedAt &&
                announcement?.updatedAt !== announcement?.createdAt
                ? announcement?.updatedAt
                : announcement?.createdAt
            )}
          </span> by{" "}
          <b>{announcement?.created_by?.full_name} </b>as Warden
        </p>

        <p className="text-gray-700 leading-relaxed">
          {announcement?.message}
        </p>

        {announcement?.notice_url && (
          <a
            href={announcement?.notice_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm text-indigo-600 hover:underline"
          >
            <Paperclip size={16} className="mr-1 opacity-70" />
            View attachment
          </a>
        )}
        <div className="flex gap-3 pt-4 border-t">

          <button
            onClick={() =>
              navigate(`/admin/anns/${id}/edit`)
            }
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            onClick={async () => {
              deleteRef.current = true
              await announcementService.deleteAnnouncement(id)
              dispatch(removeAnnouncement(id))
              navigate(`/admin/anns`)
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;


