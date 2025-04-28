import Layout from "@/components/layout";
import { sidebarData } from "@/lib/sidebarMenu";

export default function Page() {
  return (
    <Layout siderbarMenus={sidebarData}>
      <div className="flex flex-1 flex-col">kami</div>
    </Layout>
  );
}
