"use client";
import { useSuspendAdmin } from "@/hooks/use-orgs";
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
    adminId: string;
    adminName?: string;
};

export const SuspendAdminDialog = ({
    isOpen,
    onOpenChange,
    adminId,
    adminName,
}: Props) => {
    const { mutate: suspendAdmin, isPending } = useSuspendAdmin();

    const handleSuspend = () => {
        suspendAdmin(
            { id: adminId, status: false },
            {
                onSuccess: () => {
                    toast.success(`${adminName} suspended successfully`);
                    onOpenChange(false);
                },
                onError: (err: any) => {
                    toast.error(`Failed to suspend ${adminName}`);
                    console.error(err);
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0">
                <DialogHeader className="gap-0 pt-4">
                    <div className="bg-red-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Ban color="#B91C1C" size={20} strokeWidth={1.5} />
                    </div>

                    <DialogTitle className="pt-4 font-medium">Suspend Admin</DialogTitle>
                    <DialogDescription className="pt-0 text-lg">
                        Are you sure you want to suspend {adminName}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex mt-3 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => onOpenChange(false)}
                            className="border-red-700 hover:border-red-600 hover:bg-white px-6 py-6 rounded-sm border-1 bg-white text-red-700 hover:text-red-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-700 font-semibold px-6 py-6 rounded-sm text-white hover:bg-red-600"
                            onClick={handleSuspend}
                            disabled={isPending}
                        >
                            {isPending ? "..." : "Suspend"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
