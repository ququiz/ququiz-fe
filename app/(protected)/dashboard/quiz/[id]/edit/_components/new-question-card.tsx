import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NewQuestionCard = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-secondary hover:bg-secondary/80 cursor-pointer h-60 flex items-center justify-center rounded-md shadow-md p-6">
            <div className="flex flex-col space-y-2 items-center">
              <CirclePlus className="w-24 h-24" strokeWidth={0.5} />
              <p>Add a new question</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default NewQuestionCard;
