"use client";

import type React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AdminSuccess() {
    const router = useRouter()
    
    return (
        <div className="w-full">
            <h2 className="text-center text-3xl font-medium pb-4">Successful</h2>
            <span className="block text-center px-10 text-gray-900 pb-10">
                Your new password has been updated successfully. You can now use your new password to log in securely.
            </span>

            <Button
            onClick={() => router.push('/login')}
                className="bg-[#161CCA] w-full font-semibold px-6 py-6 rounded-sm text-white hover:bg-blue-500"
            >
                Done
            </Button>

        </div>
    );
}
