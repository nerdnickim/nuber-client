import { gql } from "@apollo/client";

export const TOGGLE_DRIVING = gql`
	mutation toggleDriving {
		ToggleDrivingMode {
			ok
			error
		}
	}
`;
