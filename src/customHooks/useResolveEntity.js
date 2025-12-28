import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/**
 * Resolves entity data with fallback:
 * router state → redux → api
 */
export const useResolveEntity = ({
  sliceKey,
  fetchById,
  setSelected,
  clearSelected
}) => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const reduxSelected = useSelector(
    (s) => s[sliceKey]?.selected
  );

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolve = async () => {
      setLoading(true);

      // 1️⃣ Router state
      if (state?._id) {
        setData(state);
        dispatch(setSelected(state));
        return setLoading(false);
      }

      // 2️⃣ Redux cache
      if (reduxSelected?._id === id) {
        setData(reduxSelected);
        return setLoading(false);
      }

      // 3️⃣ API
      if (id) {
        const res = await fetchById(id);
        setData(res.data.data);
        dispatch(setSelected(res.data.data));
      }

      setLoading(false);
    };

    resolve();

    return () => dispatch(clearSelected());
  }, [id]);

  return {
    data,
    loading,
    isEdit: Boolean(id)
  };
};
