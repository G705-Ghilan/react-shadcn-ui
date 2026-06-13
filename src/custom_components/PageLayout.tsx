import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function PageLayout({ title, subtitle, children }: { title: string, subtitle?: string, children?: ReactNode }) {
    return <div className="flex flex-col w-full h-full">
        <div className="flex items-center  gap-3 px-4 py-4 w-full">
            <SidebarTrigger></SidebarTrigger>
            <div className='flex flex-col'>
                <h4>{title}</h4>
                <p className='text-sm font-light text-muted-foreground'>{subtitle}</p>
            </div>
        </div>
        <Separator></Separator>
        <div className="p-4 ">
            {children}
        </div>
    </div>
}