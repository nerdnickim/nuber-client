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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
