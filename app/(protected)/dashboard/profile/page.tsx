import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import SignOutButton from "./_components/sign-out-button";

const Profile = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <main className="max-w-2xl mx-auto space-y-6">
      <h2 className="font-medium text-3xl ml-4">Profile</h2>
      <div className="bg-secondary w-full space-y-5 px-6 py-4 rounded-md shadow-md">
        <div>
          <h3 className="font-bold">User ID</h3>
          <p>{session.user.id}</p>
        </div>
        <div>
          <h3 className="font-bold">Username</h3>
          <p>{session.user.username}</p>
        </div>
        <div>
          <h3 className="font-bold">Email</h3>
          <p>{session.user.email}</p>
        </div>
        <div>
          <h3 className="font-bold">Full Name</h3>
          <p>{session.user.fullname}</p>
        </div>
        <SignOutButton />
      </div>
    </main>
  );
};
export default Profile;
