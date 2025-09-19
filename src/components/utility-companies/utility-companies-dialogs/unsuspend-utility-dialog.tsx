"use client";
import {   useSuspendUtility } from "@/hooks/use-orgs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Ban } from "lucide-react";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    organizationId: string; 
    organizationName?: string; 
};

export const UnsuspendUtilityDialog = ({
    isOpen,
    onOpenChange,
    organizationId,
    organizationName,
}: Props) => {
    const { mutate: suspendUtility, isPending } = useSuspendUtility();

    const handleUnSuspend = () => {
        suspendUtility(
            { id: organizationId, status: true }, 
            {
                onSuccess: () => {
                    toast.success(`${organizationName} unsuspended successfully`);
                    onOpenChange(false);
                },
                onError: (err) => {
                    toast.error(`Failed to unsuspend ${organizationName}`);
                    console.error(err);
                },
            }
        );
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0">
                <DialogHeader className="gap-0 pt-4">
                    <div className="bg-blue-200 w-12 h-12 flex items-center justify-center rounded-full">
                        <Ban color="#161CCA" size={20} strokeWidth={1.5} />
                    </div>

                    <DialogTitle className="pt-4 font-medium">Unsuspend Organization</DialogTitle>
                    <DialogDescription className="pt-0 text-lg">
                        Are you sure you want to unsuspend {organizationName}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex mt-3 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] hover:border-blue-500 hover:bg-white px-6 py-6 rounded-sm border-1 bg-white text-[var(--primary)] hover:text-blue-500"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[var(--primary)] font-semibold px-6 py-6 rounded-sm text-white hover:bg-blue-500"
                            onClick={handleUnSuspend}
                            disabled={isPending}
                        >
                            {isPending ? "..." : "Unsuspend"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
