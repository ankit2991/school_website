import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import Table from "../../Components/Page_Forms/Table";
import { getclass } from "../../services/api";

function Subject_Allocation() {
  const navigate = useNavigate();
  const columns = [{ header: "Name", shortHeader: "Name", accessor: "name" }];
  const data = [
    { id: 1, name: "B" },
    { id: 2, name: "G" },
  ];

  const [classList, setClassList] = useState([]);
  // useEffect(() => {
  //     const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
  //     if (!instId) return;

  //     async function fetchClasses() {
  //         try {
  //             const res = await getclass(instId);  // ✅ Pass selected Institute ID
  //             setClassList(res.Table || []);
  //         } catch (error) {
  //             console.log("Class API Error:", error);
  //         }
  //     }

  //     fetchClasses();
  // }, []);

  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    if (!instId) return;
    async function fetchClasses() {
      try {
        const res = await getclass(instId);
        // ✅ check API success
        if (res?.Table?.[0]?.ResultCode === "R100") {
          setClassList(res.Table1 || []);
        } else {
          setClassList([]);
        }
      } catch (error) {
        console.log("Class API Error:", error);
        setClassList([]);
      }
    }

    fetchClasses();
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between items-center gap-x-4 mb-5">
        <Heading
          label={"Student Subject Allocation"}
          style={"text-[22px] sm:text-3xl"}
        />
        <Buttons
          click={() => navigate("/Subject-Allocation2")}
          label={"Add"}
          style="whitespace-nowrap h-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
        <Options
          label={"Class"}
          name={""}
          optionMsg="Select Class"
          options={classList.map((item) => item.ClassName)}
        />
        <FormInput label={"Group Name"} placeholder={"Enter Group Name"} />
      </div>

      <div className="flex justify-end">
        <Buttons
          click={() => navigate("/Subject-Allocation2")}
          label={"Search"}
        />
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          data={data}
          actions={(row) => (
            <>
              <Buttons
                label={"Edit"}
                click={() => console.log("Edit:", row)}
                style="hidden sm:inline"
              />
              <Buttons
                label={"Delete"}
                click={() => console.log("Print:", row)}
                style="hidden sm:inline"
              />
              {/* Mobile icons */}
              <button
                className="sm:hidden text-lg"
                onClick={() => console.log("Edit:", row)}
              >
                ✏️
              </button>
              <button
                className="sm:hidden text-xl"
                onClick={() => console.log("Print:", row)}
              >
                🗑️
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}

export default Subject_Allocation;
