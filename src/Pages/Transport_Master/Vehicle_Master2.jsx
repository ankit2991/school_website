import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Options from "../../Components/Page_Forms/Options";
import Buttons from "../../Components/Page_Forms/Buttons";
import Loader from "../../Components/Page_Forms/Loader";
import {
  getRoute,
  getVehicleProviderList,
  getVehicleTypeList,
  getVehicleDetail,
  getVehicleInsertUpdate,
} from "../../services/api";

function Vehicle_Master2() {
  const location = useLocation();
  const vehicleId = location.state || null;

  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");

  const [providerList, setProviderList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [searched, setSearched] = useState(false);

  const [formData, setFormData] = useState({
    provider: "",
    vehicleType: "",
    route: "",
    vehicleNo: "",
    noOfSeat: "",
    strength: "",
    purchaseDate: "",
    insuranceDate: "",
    expireDate: "",
    driverName: "",
    contactNo: "",
    licenceNo: "",
    address: "",
  });

  /* ================= DATE FORMAT ================= */
  const apiDateToInput = (apiDate) => {
    if (!apiDate) return "";
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10);
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  /* ================= FETCH ALL DROPDOWNS ================= */
  useEffect(() => {
    if (!instId || !sessId) return;
    fetchAllDropdowns();
  }, [instId, sessId]);

  const fetchAllDropdowns = async () => {
    try {
      setSearched(true);

      const [providerRes, typeRes, routeRes] = await Promise.all([
        getVehicleProviderList(instId, sessId),
        getVehicleTypeList(instId, sessId),
        getRoute(instId, sessId),
      ]);

      if (providerRes?.Table) setProviderList(providerRes.Table);
      if (typeRes?.Table) setTypeList(typeRes.Table);
      if (routeRes?.Table) setRouteList(routeRes.Table);
    } catch (err) {
      console.error("Dropdown API error", err);
    } finally {
      setSearched(false);
    }
  };

  /* ================= FETCH VEHICLE DETAIL (EDIT) ================= */
  useEffect(() => {
    if (!vehicleId) return;
    fetchVehicleDetail();
  }, [vehicleId]);

  const fetchVehicleDetail = async () => {
    try {
      setSearched(true);
      const res = await getVehicleDetail(vehicleId, instId, sessId);
      if (res?.Table?.length) {
        const d = res.Table[0];
        setFormData({
          provider: d.F_VehicleProviderMaster?.toString() || "",
          vehicleType: d.F_VehicleTypeMaster?.toString() || "",
          route: d.F_RouteMaster?.toString() || "",
          vehicleNo: d.VehicleNo || "",
          noOfSeat: d.NoOfSeat || "",
          strength: d.Strength || "",
          purchaseDate: apiDateToInput(d.PurchaseDate),
          insuranceDate: apiDateToInput(d.InsuranceDate),
          expireDate: apiDateToInput(d.InsuranceExpireDate),
          driverName: d.DriverName || "",
          contactNo: d.ContactNo || "",
          licenceNo: d.DriverLicenceNo || "",
          address: d.DAddress || "",
        });
      }
    } finally {
      setSearched(false);
    }
  };

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setSearched(true);
      const userId = localStorage.getItem("UserId") || 1;

      const res = await getVehicleInsertUpdate(
        vehicleId || 0,
        formData.vehicleType,
        formData.vehicleNo,
        formData.provider,
        formData.route,
        formData.noOfSeat,
        formData.strength,
        formData.purchaseDate,
        formData.insuranceDate,
        formData.expireDate,
        formData.driverName,
        formData.licenceNo,
        formData.address,
        formData.contactNo,
        userId,
        instId,
        sessId
      );

      if (res?.Table?.length) {
        const [code, msg] = res.Table[0].Column1.split("|");
        alert(msg);
      }
    } catch (err) {
      console.error(err);
      alert("API Error");
    } finally {
      setSearched(false);
    }
  };

  return (
    <>
      <Loader show={searched} />

      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
        <Heading label="Vehicle Master" style="mb-5" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <Options label="Provider" optionMsg="Select Provider" options={providerList} value={formData.provider} valueKey="Id" labelKey="Name" onChange={handleChange} name="provider" />
          <Options label="Vehicle Type" optionMsg="Select Vehicle Type" options={typeList} value={formData.vehicleType} valueKey="Id" labelKey="VehicleType" onChange={handleChange} name="vehicleType" />
          <Options label="Route" optionMsg="Select Route" options={routeList} value={formData.route} valueKey="Id" labelKey="RouteName" onChange={handleChange} name="route" />

          <FormInput label="Vehicle Number" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
          <FormInput label="Number Of Seat" name="noOfSeat" value={formData.noOfSeat} onChange={handleChange} />
          <FormInput label="Strength" name="strength" value={formData.strength} onChange={handleChange} />
          <FormInput type="date" label="Purchase Date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
          <FormInput type="date" label="Insurance Date" name="insuranceDate" value={formData.insuranceDate} onChange={handleChange} />
          <FormInput type="date" label="Tns. Expire Date" name="expireDate" value={formData.expireDate} onChange={handleChange} />
          <FormInput label="Driver Name" name="driverName" value={formData.driverName} onChange={handleChange} />
          <FormInput label="Contact Number" name="contactNo" value={formData.contactNo} onChange={handleChange} />
          <FormInput label="Driver License Number" name="licenceNo" value={formData.licenceNo} onChange={handleChange} />
        </div>

        <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} inputStyle="mb-5" />

        <div className="flex justify-end space-x-6">
          <Buttons label="Cancel" />
          <Buttons label={"Save"} click={handleSave} />
        </div>
      </div>
    </>
  );
}

export default Vehicle_Master2;

