import TabNavigator from "@/components/TabNavigator";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <TabNavigator />
      <main className="p-4">{children}</main>
    </div>
  );
}
