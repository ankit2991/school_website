import { useEffect, useState } from "react";
import { getclass } from "../services/api";

const useClassList = () => {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    if (!instId) return;

    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getclass(instId);

        if (res?.Table?.[0]?.ResultCode === "R100") {
          setClassList(res?.Table1 || []);
        } else {
          setClassList([]);
        }
      } catch (err) {
        console.error("Class API Error:", err);
        setClassList([]);
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return {
    classList,
    loading,
    error,
  };
};

export default useClassList;
