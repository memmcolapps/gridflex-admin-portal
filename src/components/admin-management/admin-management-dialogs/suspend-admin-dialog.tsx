"use client";
import { useCreateOrg } from "@/hooks/use-orgs";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { UnifiedFormData } from "@/types/unifiedForm";
import { Ban } from "lucide-react";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (data: UnifiedFormData) => void;
    initialData?: Partial<UnifiedFormData>;
};

export const SuspendAdminDialog = ({
    isOpen,
    onOpenChange,
}: Props) => {
    const {
        mutate: createOrg,
        isError,
        error,
        isSuccess,
        isPending,
    } = useCreateOrg();

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0">
                <DialogHeader className="gap-0 pt-4">
                    <div className="bg-red-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <Ban color="#B91C1C" size={20} strokeWidth={1.5} />
                    </div>

                    <DialogTitle className="pt-4 font-medium">Suspend Admin</DialogTitle>
                    <DialogDescription className="pt-0 text-lg">
                        Are you sure you want to suspend Adeyemi Oyewo
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex mt-3 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-red-700 hover:border-red-600 hover:bg-white px-6 py-6 rounded-sm border-1 bg-white text-red-700 hover:text-red-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-red-700 font-semibold px-6 py-6 rounded-sm text-white hover:bg-red-600"
                        >
                            {isPending ? "..." : "Suspend"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
