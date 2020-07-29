import React from "react";
import PlacePresenter from "./PlacePresenter";
import { useMutation } from "@apollo/client";
import { EDIT_PLACE } from "./Place.queries";
import { GET_PLACES } from "src/Shared.queries";
import { EditPlace, EditPlaceVariables } from "src/types/api";

const PlaceContainer = ({ id, fav, name, address }) => {
	const [editPlaceMutation] = useMutation<EditPlace, EditPlaceVariables>(EDIT_PLACE, {
		variables: { id, isFav: !fav },
		refetchQueries: [{ query: GET_PLACES }],
	});
	return (
		<PlacePresenter
			fav={fav}
			name={name}
			address={address}
			mutation={editPlaceMutation}
		/>
	);
};

export default PlaceContainer;
