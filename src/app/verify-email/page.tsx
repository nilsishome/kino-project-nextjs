import { Suspense } from "react";
import VerifyEmailPage from "../../../components/verify/verify";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
