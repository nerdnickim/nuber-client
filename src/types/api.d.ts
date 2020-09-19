/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDriving
// ====================================================

export interface toggleDriving_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toggleDriving {
  ToggleDrivingMode: toggleDriving_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPlace
// ====================================================

export interface EditPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface EditPlace {
  EditPlace: EditPlace_EditPlace;
}

export interface EditPlaceVariables {
  id: number;
  name?: string | null;
  isFav?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPlace
// ====================================================

export interface AddPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface AddPlace {
  AddPlace: AddPlace_AddPlace;
}

export interface AddPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdataMyProfile
// ====================================================

export interface UpdataMyProfile_UpdataMyProfile {
  __typename: "UpdataMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface UpdataMyProfile {
  UpdataMyProfile: UpdataMyProfile_UpdataMyProfile;
}

export interface UpdataMyProfileVariables {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportMovement
// ====================================================

export interface reportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
  error: string | null;
}

export interface reportMovement {
  ReportMovement: reportMovement_ReportMovement;
}

export interface reportMovementVariables {
  lat: number;
  lng: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDrivers
// ====================================================

export interface getDrivers_GetNearbyDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
}

export interface getDrivers_GetNearbyDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  error: string | null;
  drivers: (getDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface getDrivers {
  GetNearbyDrivers: getDrivers_GetNearbyDrivers;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRide
// ====================================================

export interface requestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface requestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: requestRide_RequestRide_ride | null;
}

export interface requestRide {
  RequestRide: requestRide_RequestRide;
}

export interface requestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNearbyRide
// ====================================================

export interface getNearbyRide_GetNearbyRide_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getNearbyRide_GetNearbyRide_ride {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  passenger: getNearbyRide_GetNearbyRide_ride_passenger;
}

export interface getNearbyRide_GetNearbyRide {
  __typename: "GetNearbyRideResponse";
  ok: boolean;
  error: string | null;
  ride: getNearbyRide_GetNearbyRide_ride | null;
}

export interface getNearbyRide {
  GetNearbyRide: getNearbyRide_GetNearbyRide;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRideStatus
// ====================================================

export interface updateRideStatus_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
}

export interface updateRideStatus {
  UpdateRideStatus: updateRideStatus_UpdateRideStatus;
}

export interface updateRideStatusVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: neabyRideSubscription
// ====================================================

export interface neabyRideSubscription_NeabyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface neabyRideSubscription_NeabyRideSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  passenger: neabyRideSubscription_NeabyRideSubscription_passenger;
}

export interface neabyRideSubscription {
  NeabyRideSubscription: neabyRideSubscription_NeabyRideSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PhoneVerification
// ====================================================

export interface PhoneVerification_PhoneVerification {
  __typename: "PhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface PhoneVerification {
  PhoneVerification: PhoneVerification_PhoneVerification;
}

export interface PhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FaceBookConnect
// ====================================================

export interface FaceBookConnect_FaceBookConnect {
  __typename: "FaceBookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FaceBookConnect {
  FaceBookConnect: FaceBookConnect_FaceBookConnect;
}

export interface FaceBookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface verifyPhone {
  CompletePhoneVerification: verifyPhone_CompletePhoneVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  fullName: string | null;
  isDriving: boolean;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyPlaces
// ====================================================

export interface GetMyPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (GetMyPlaces_GetMyPlaces_places | null)[] | null;
}

export interface GetMyPlaces {
  GetMyPlaces: GetMyPlaces_GetMyPlaces;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
