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
    const [activeTab, setActiveTab] = useState("account");
    const [loading, setLoading] = useState(false);
    const handleChange = (event, _) => {
        setActiveTab(event);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await ConfessionService.getConfessionsForUser(activeTab);
        } catch {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [activeTab]);

  return (
    <Tabs
      defaultValue="account"
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
  );
};

export default MyConfessions;
