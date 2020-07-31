import React from "react";
import AddPlacePresenter from "./AddPlacePresenter";
import useInput from "src/Hooks/useInput";
import { useMutation } from "@apollo/client";
import { ADD_PLACE } from "./AddPlace.queries";
import { AddPlace, AddPlaceVariables } from "src/types/api";
import { GET_PLACES } from "src/Shared.queries";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddPlaceContainer = ({ location }) => {
	const { state } = location;
	console.log(state);
	const name = useInput("");
	const address = useInput(state?.address || "");
	const lat = useInput(state?.lat || 0);
	const lng = useInput(state?.lng || 0);
	const history = useHistory();
	const [addPlaceMutation, { loading }] = useMutation<AddPlace, AddPlaceVariables>(
		ADD_PLACE,
		{
			variables: {
				name: name.value,
				lat: lat.value,
				lng: lng.value,
				address: address.value,
				isFav: false,
			},
			onCompleted: (data) => {
				const { AddPlace } = data;
				if (AddPlace.ok) {
					toast.success("Place added");
					setTimeout(() => {
						history.push("/places");
					}, 2000);
				} else if (AddPlace.error) {
					toast.error(AddPlace.error);
				}
			},
			refetchQueries: [{ query: GET_PLACES }],
		}
	);
	return (
		<AddPlacePresenter
			name={name}
			address={address}
			loading={loading}
			mutation={addPlaceMutation}
			pickupAddress={lat.value !== 0 && lng.value !== 0}
		/>
	);
};

export default AddPlaceContainer;
