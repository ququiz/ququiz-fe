import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WaitingRoom = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex text-center gap-y-5 flex-col items-center">
        <div>
          <h1 className="text-4xl font-semibold">Quiz name</h1>
          <h2 className="text-3xl font-medium">Waiting Room</h2>
          <p className="text-lg">Quiz opens in 1d hh</p>
        </div>
        <Link href={`/quiz/${params.id}/start`}>
          <Button className="w-[25rem]">Start</Button>
        </Link>
      </div>
    </main>
  );
};
export default WaitingRoom;
