import { AlertTriangle } from "lucide-react";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      backButtonLabel="Go Back"
      backButtonHref="/auth/login"
    >
      <AlertTriangle className="text-destructive w-full flex justify-center items-center" />
    </CardWrapper>
  );
};
