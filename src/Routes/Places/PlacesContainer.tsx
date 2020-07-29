import React from "react";
import PlacesPresenter from "./PlacesPresenter";
import { useQuery } from "@apollo/client";
import { GET_PLACES } from "src/Shared.queries";
import { GetMyPlaces } from "src/types/api";

const PlacesContainer = () => {
	const { data, loading } = useQuery<GetMyPlaces>(GET_PLACES);
	return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
