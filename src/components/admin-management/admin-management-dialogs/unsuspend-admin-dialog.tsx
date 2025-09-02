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

export const UnsuspendAdminDialog = ({
    isOpen,
    onOpenChange,
}: Props) => {
    const {
        mutate: createOrg,
        isPending,
    } = useCreateOrg();

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0">
                <DialogHeader className="gap-0 pt-4">
                    <div className="bg-blue-200 w-12 h-12 flex items-center justify-center rounded-full">
                        <Ban color="#161CCA" size={20} strokeWidth={1.5} />
                    </div>

                    <DialogTitle className="pt-4 font-medium">Unsuspend Admin</DialogTitle>
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
                            className="border-[var(--primary)] hover:border-blue-500 hover:bg-white px-6 py-6 rounded-sm border-1 bg-white text-[var(--primary)] hover:text-blue-500"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[var(--primary)] font-semibold px-6 py-6 rounded-sm text-white hover:bg-blue-500"
                        >
                            {isPending ? "..." : "Suspend"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
