import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ConfessionService from "../services/confessionService";
import { useEffect, useState } from "react";
import ConfessionItem from "./../component/ConfessionItem";

const MyConfessions = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const handleChange = (event, _) => {
    setActiveTab(event);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await ConfessionService.getConfessionsForUser(activeTab);
      const data = res.map((d) => ({
        confessionId: d.confessionId,
        title: d.title,
        body: d.body,
        tags: d.tags.split(",").map((t) => t.trim()),
        createdAt: d.createdAt,
        executedAt: d.executedAt,
        relateCount: d.relate_count,
        notRelateCount: d.not_relate_count,
      }));
      setConfessions(data);
      console.log(confessions);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto p-4">
      <h1 className="text-xl font-semibold">My Confessions</h1>
      <Tabs
        defaultValue="Pending"
        className="w-full max-w mx-auto mt-8 rounded-lg p-4"
        onValueChange={handleChange}
      >
        <TabsList>
          <TabsTrigger value="Pending">Pending Confessions</TabsTrigger>
          <TabsTrigger value="Published">Published Confessions</TabsTrigger>
          <TabsTrigger value="Rejected">Rejected Confessions</TabsTrigger>
          <TabsTrigger value="Deleted">Deleted Confessions</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending">
          <div>
            {confessions.map((confession, index) => (
              <ConfessionItem
                key={index}
                confession={confession}
                status="Pending"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Published">
          <div>
            {confessions.map((confession, index) => (
              <ConfessionItem
                key={index}
                confession={confession}
                status="Published"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Rejected">
          <div>
            {confessions.map((confession, index) => (
              <ConfessionItem
                key={index}
                confession={confession}
                status="Rejected"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Deleted">
          <div>
            {confessions.map((confession, index) => (
              <ConfessionItem
                key={index}
                confession={confession}
                status="Deleted"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyConfessions;
