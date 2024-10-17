import React, { Suspense } from "react";

import { NewPasswordForm } from "@/components/auth/NewPasswordForm";

const NewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}><NewPasswordForm /></Suspense>
  )
};

export default NewPassword;
