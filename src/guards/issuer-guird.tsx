import Error from "next/error";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/use-auth";
import { ReactNode } from "react";
import { useAuthContext } from "@/context/auth";

// This guard protects an auth page from being loaded when using a different issuer.
// For example, if we are using Auth0, and we try to load `/auth/firebase/login` path, this
// will render an error.

type IssuerGuardPropTypes = {
  children: ReactNode;
  issuer: any;
};
export const IssuerGuard = (props: IssuerGuardPropTypes) => {
  const { children, issuer: expectedIssuer } = props;
  const {} = useAuthContext();

  if (expectedIssuer !== "JWT") {
    return (
      <Error
        statusCode={400}
        title={`Issuer mismatch, currently using ${issuer}`}
        withDarkMode={false}
      />
    );
  }

  return <>{children}</>;
};
