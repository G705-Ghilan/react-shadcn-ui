import { Button } from "@/components/ui/button";
import PageLayout from "@/custom_components/PageLayout";

export default function HomePage() {
    return <PageLayout title="Home Page">
        <Button variant='outline' onClick={()=>{
            localStorage.setItem("web_app_theme_mode", 'light')
        }}>Set Theme</Button>
    </PageLayout>
}