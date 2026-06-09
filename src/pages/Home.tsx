import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import PageLayout from "@/custom_components/PageLayout";
import { ArrowUpRightIcon, Info } from "lucide-react";
import { NavLink } from "react-router";

export default function HomePage() {
    return <PageLayout title="Home Page">
        <div className="flex justify-center w-full mt-[5%]">
            <Empty className="">
                <EmptyMedia variant={'icon'}>
                    <Info></Info>
                </EmptyMedia>
                <EmptyTitle>Nothing to do in Home</EmptyTitle>
                <EmptyDescription>This project is only for learning<br />Here we can show an example of an empty state</EmptyDescription>
                <Button
                    variant="link"
                    asChild
                    className="text-muted-foreground"
                    size="sm"
                >
                    <NavLink to="/react-shadcn-ui/github-search">
                        Try Github Search <ArrowUpRightIcon />
                    </NavLink>
                </Button>
            </Empty>
        </div>
    </PageLayout>
}