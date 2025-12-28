import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnnouncementForm } from "../../../index";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAnnouncement } from "../../../../utils/store/announcementsSlice";
import { useEffect, useState } from "react";
import { announcementService } from "../../../../services/apiService";

const EditAnnouncement = () => {
    const { id } = useParams();
    const { state } = useLocation(); // announcement data
    const { selected } = useSelector((state) => state.anns);
    const dispatch = useDispatch();
    const [resolved, setResolved] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(selected);
    const navigate = useNavigate()


    useEffect(() => {
        const resolve = async () => {
            if (state?._id) {
                setResolved(state);
                dispatch(setSelectedAnnouncement(resolved));
                return setLoading(false);
            }
            if (selected?._id === id) {
                setResolved(selected);
                return setLoading(false);
            }
            const res = await announcementService.getById(id);
            setResolved(res.data);
            dispatch(setSelectedAnnouncement(res.data.data));
            setLoading(false);
        };

        resolve();
    }, [id]);

    const handleUpdate = async (data) => {
        console.log("Updating announcement:", id, data);
        const payload = new FormData();
        Object.entries(data).forEach(([k, v]) => v && payload.append(k, v));
        const res = await announcementService.updateAnnouncement(payload, id);
        // console.log(res);
        navigate(`/admin/anns`)
    };
    if (loading) {
        return <div className="p-6">Loading announcement...</div>;
    }

    return (
        <AnnouncementForm
            initialData={state || selected}
            onSubmit={handleUpdate}
            isEdit={true}
        />
    );
};

export default EditAnnouncement;
