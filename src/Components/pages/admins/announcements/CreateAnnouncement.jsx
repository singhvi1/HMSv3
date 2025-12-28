import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { announcementService } from "../../../../services/apiService";
import { setAnnouncements } from "../../../../utils/store/announcementsSlice";
import { AnnouncementForm } from "../../../index"


const CreateAnnouncement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    console.log("ann form called for new annoucnemtn")

    const handleCreate = async (data) => {
        setLoading(true);
        try {
            const payload = new FormData();
            Object.entries(data).forEach(([k, v]) => v && payload.append(k, v));

            const res = await announcementService.createAnnouncement(payload);
            dispatch(setAnnouncements(res?.data?.announcement));
            navigate("/admin/anns");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnnouncementForm
            initialData={null}
            onSubmit={handleCreate}
            loading={loading}
            isEdit={false}
        />
    );
};
export default CreateAnnouncement;