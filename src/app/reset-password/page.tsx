import { Suspense } from "react";
import ResetPasswordPage from "../../../components/reset-password/resetpassword";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
