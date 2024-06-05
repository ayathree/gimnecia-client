// import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useEffect, useState } from "react";


const ApplicantDetails = () => {
    const applicant = useLoaderData()
    console.log(applicant)
    return (
        <div>
            <h1>applicant:{applicant.name}</h1>
        </div>
    );
};

export default ApplicantDetails;