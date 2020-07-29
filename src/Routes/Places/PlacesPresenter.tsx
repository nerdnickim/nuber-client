import React from "react";
import styled from "styled-components";
import { GetMyPlaces } from "src/types/api";
import { Helmet } from "react-helmet";
import Loading from "src/Components/Loading";
import Place from "src/Components/Place";
import Header from "src/Components/Header";
import { Link } from "react-router-dom";

const Container = styled.div`
	padding: 0 30px;
`;

const ExtendedPlace = styled(Place)``;

const ExtendedLink = styled(Link)`
	margin-top: 20px;
`;

interface IProps {
	data?: GetMyPlaces;
	loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
	data: { GetMyPlaces: { places = null } = {} } = {},
	loading,
}) => {
	return (
		<React.Fragment>
			<Helmet>
				<title>Places | Nuber</title>
			</Helmet>
			<Header title={"Settings"} backTo={"/settings"} />
			<Container>
				{loading && <Loading />}
				{!loading && places?.length === 0
					? "You have no places"
					: places?.map((place) => (
							<ExtendedPlace
								key={place?.id}
								id={place?.id}
								fav={place?.isFav}
								name={place?.name}
								address={place?.address}
							/>
					  ))}
				<ExtendedLink to={"/add-place"}>Place add some places!</ExtendedLink>
			</Container>
		</React.Fragment>
	);
};

export default PlacesPresenter;
