"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";


type ContactData = {
    id: string;
    phoneNo: string;
    organizationName: string;
    email: string;
    message: string;
    organizationSize: string;
    status: string;
    // lastLogin: string;
    createdAt: string;
};

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedContact?: ContactData | null;
}

export const ViewDetailsDialog = ({
    isOpen,
    onOpenChange,
    selectedContact,
}: Props) => {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-170">
                <DialogHeader>
                    <DialogTitle>Message Details</DialogTitle>
                </DialogHeader>
                <div className="mt-2 grid grid-cols-2 gap-5 pb-10">
                    <div className="space-y-4">
                        <Label htmlFor="organization">
                            Organization
                        </Label>
                        <p className="text-gray-600">{selectedContact?.organizationName}</p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="organizationSize">
                            Organization Size
                        </Label>
                        <p className="text-gray-600">{selectedContact?.organizationSize} employees</p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="email">
                            Email Address
                        </Label>
                        <p className="text-gray-600">{selectedContact?.email}</p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="date">
                            Date Received
                        </Label>
                        <p className="text-gray-600">{selectedContact?.createdAt}</p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="phone">
                            Phone Number
                        </Label>
                        <p className="text-gray-600">{selectedContact?.phoneNo}</p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="date">
                        </Label>
                        <p className="text-gray-600"></p>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="message">
                            Full Message
                        </Label>
                        <Textarea 
                            className="w-150 text-gray-600 md:text-base h-full " 
                            value={selectedContact?.message || ''}
                            placeholder="No message available"
                            readOnly
                        />
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex mt-10 w-full justify-between gap-2">
                        <Button
                            variant="outline"
                            size='lg'
                            onClick={() => onOpenChange(false)}
                            className="border-[var(--primary)] px-6 py-5 rounded-sm border-1 bg-white text-[#161CCA] hover:text-[#161CCA]"
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
