import { gql } from "@apollo/client";

export const EDIT_PLACE = gql`
	mutation EditPlace($id: Int!, $name: String, $isFav: Boolean) {
		EditPlace(id: $id, name: $name, isFav: $isFav) {
			ok
			error
		}
	}
`;
