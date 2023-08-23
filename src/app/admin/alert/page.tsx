import AlertForm from "@/app/admin/alert/components/alert-form";

const getAlert = async () => {
  return fetch(`${process.env.NEXTAUTH_URL}/api/alerts`, {
    method: "GET",
    cache: "no-cache",
  }).then((response) => response.json());
};

const AlertPage = async () => {
  const alert = await getAlert();
  return (
    <main>
      <AlertForm alert={alert} />
    </main>
  );
};

export default AlertPage;
