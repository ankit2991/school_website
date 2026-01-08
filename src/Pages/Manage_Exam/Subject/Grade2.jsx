import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useLocation, useNavigate } from 'react-router-dom'
import { getGradeDetail, getGradeInsertUpdate } from '../../../services/api'
import Loader from '../../../Components/Page_Forms/Loader'

function Grade2() {
    const navigate = useNavigate()
    const location = useLocation()

    // ✅ SAFE extraction
    // const { gradeId = null, gradeName = "" } = location.state || {} 
    const {gradeId = null, gradeSchemeId = 0, gradeName = "" } = location.state || {}
    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId") 

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
  id: gradeId || 0,                 // edit → id, add → 0
  gradeSchemeId: gradeSchemeId || 0, // ✅ SELECTED GRADE ID
  name: gradeName || "",
  alias: "",
  min: "",
  max: "",
  remark: ""
})


    const handleChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    // ================= FETCH GRADE DETAIL =================
    useEffect(() => {
        if (!gradeId) return   // 🔴 VERY IMPORTANT

        fetchGradeDetail()
    }, [gradeId])

    const fetchGradeDetail = async () => {
        try {
            setLoading(true)

            const res = await getGradeDetail(
                gradeId,   // ✅ ID BASED (as per your API)
                instId,
                sessId
            )

            if (res?.Table?.length > 0) {
                const data = res.Table[0]

                setFormData({
                    id: data.Id ?? 0,
                    gradeSchemeId: data.F_GradeSchemeMaster ?? 0,
                    name: data.Name ?? "",
                    alias: data.Alias ?? "",
                    min: data.MinNum ?? "",
                    max: data.MaxNum ?? "",
                    remark: data.Remarks ?? ""
                })
            }

        } catch (error) {
            console.error("Grade Detail Error:", error)
        } finally {
            setLoading(false)
        }
    }

    // ================= SAVE / UPDATE =================
    const handleSave = async () => {
        try {
            setLoading(true)

            const res = await getGradeInsertUpdate(
                formData.id,               // Id (update)
                formData.gradeSchemeId,    // GradeId
                formData.name,
                formData.alias,
                formData.min,
                formData.max,
                formData.remark,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|")

            if (code === "M101" || code === "M102") {
                alert(text)
                navigate(-1)
            } else {
                alert(text || "Something went wrong")
            }

        } catch (error) {
            console.error("Save Error:", error)
            alert("Server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={loading} />

            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Grade Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">

                <FormInput
                    label="Name"
                    value={formData.name}
                    placeholder="Enter Grade"
                    onChange={(e) => handleChange("name", e.target.value)}
                />

                <FormInput
                    label="Alias"
                    value={formData.alias}
                    placeholder="Enter Alias"
                    onChange={(e) => handleChange("alias", e.target.value)}
                />

                <FormInput
                    label="Minimum"
                    value={formData.min}
                    placeholder="Enter Minimum"
                    onChange={(e) => handleChange("min", e.target.value)}
                />

                <FormInput
                    label="Maximum"
                    value={formData.max}
                    placeholder="Enter Maximum"
                    onChange={(e) => handleChange("max", e.target.value)}
                />

                <FormInput
                    label="Remark"
                    value={formData.remark}
                    placeholder="Enter Remark"
                    onChange={(e) => handleChange("remark", e.target.value)}
                />

            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label="Cancel" style="px-6 py-2" click={() => navigate()} />
                  <Buttons label={"Save"} style='px-6 py-2' click={handleSave} />
                </div>
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label="Delete" style="px-6 py-2" />
                    <Buttons label="Print" style="px-6 py-2" />
                </div>
            </div>
        </div>
    )
}

export default Grade2
