import { getServerSession } from "next-auth";
import authConfig from "../../../../auth.config";

const SettingsPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
      return null;
    }
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <h1>Settings Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default SettingsPage;
