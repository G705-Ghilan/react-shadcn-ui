import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function PageLayout({ title, children }: { title: string, children?: ReactNode }) {
    return <div className="flex flex-col w-full h-full">
        <div className="flex items-center  gap-3 px-4 py-4 w-full">
            <SidebarTrigger></SidebarTrigger>
            <h4>{title}</h4>
        </div>
        <Separator></Separator>
        <div className="p-4 ">
            {children}
        </div>
    </div>
}