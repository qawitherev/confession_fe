import GreyPill from "./Pill";

const TheTable = ({ data, isRejected }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-400">
                <thead>
                    <tr>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">No</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Username</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Title</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Body</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">Tags</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">{isRejected ? `Rejected By` : `Published By`}</th>
                        <th className="text-left p-2 border border-gray-400 bg-slate-300">{isRejected ? `Rejected At` : `Published At`}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, index) => (
                        <tr key={index}>
                            <td className="p-2 border border-gray-400">{index + 1}</td>
                            <td className="p-2 border border-gray-400">{d.username}</td>
                            <td className="p-2 border border-gray-400">{d.title}</td>
                            <td className="p-2 border border-gray-400">{d.body}</td>
                            <td className="p-2 border border-gray-400"><div className="flex flex-wrap gap-1">{d.tags.map((tag, index)=>(<GreyPill key={index} textData={tag}/>))}</div></td>
                            <td className="p-2 border border-gray-400">{d.rejectedBy}</td>
                            <td className="p-2 border border-gray-400">{d.rejectedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TheTable; 