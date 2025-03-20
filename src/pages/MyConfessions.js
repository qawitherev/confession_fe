import { Tab } from "@mui/material";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ConfessionService from "../services/confessionService";
import { useEffect, useState } from "react";

const MyConfessions = () => {
    const [activeTab, setActiveTab] = useState("Pending");
    const [loading, setLoading] = useState(false);
    const handleChange = (event, _) => {
        setActiveTab(event);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await ConfessionService.getConfessionsForUser(activeTab);
            const data = res[0].map(d => ({
                title: d.username,
                body: d.title,
                body: d.body,
                tags: d.tags.split(',').map(t => t.trim()),
                createdAt: new Date(d.createdAt).toLocaleDateString('en-US'),
                rejectedBy: d.rejectedBy,
                rejectedAt: new Date(d.rejectedAt).toLocaleDateString('en-US')
            })); 
        } catch {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [activeTab]);

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto p-4">
        <h1 className="text-xl font-semibold">My Confessions</h1>
        <Tabs
          defaultValue="Pending"
          className="w-full max-w mx-auto mt-8 bg-red-300 rounded-lg shadow-lg p-4"
          onValueChange={handleChange}
        >
          <TabsList>
            <TabsTrigger value="Pending">Pending Confessions</TabsTrigger>
            <TabsTrigger value="Published">Published Confessions</TabsTrigger>
            <TabsTrigger value="Rejected">Rejected Confessions</TabsTrigger>
            <TabsTrigger value="Deleted">Deleted Confessions</TabsTrigger>
          </TabsList>
          <TabsContent value="Pending">Make changes</TabsContent>
          <TabsContent value="Published">Change your password here.</TabsContent>
          <TabsContent value="Rejected">Change your email here.</TabsContent>
          <TabsContent value="Deleted">Change your email here.</TabsContent>
        </Tabs>
    </div>
  );
};

export default MyConfessions;
