import { Alert } from "@prisma/client";
import React from "react";

import AlertForm from "@/app/admin/alert/components/alert-form";
import { prisma } from "@/lib/prisma";

const getAlert = async () => {
  return prisma.alert.findFirst();
};

const AlertPage = async () => {
  const alert = (await getAlert()) as Alert;
  return (
    <main>
      <AlertForm alert={alert} />
    </main>
  );
};

export default AlertPage;
