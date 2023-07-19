import React from "react";
import { useLocation } from "react-router-dom";
import EditC from "../components/EditC";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import axios from "axios";
const APIbaseURL = "https://mack-webmobile.vercel.app/api";

export default function EditUser() {
  const location = useLocation();
  const data = location.state;
  console.log("dataPAGE", data);
  return <EditC dataP={data}></EditC>;
}
