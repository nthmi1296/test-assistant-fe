import { Link } from "react-router-dom";
import { useAuthStore } from "../state/auth";

export default function DemoTable() {
    const user = useAuthStore((s) => s.user);
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const items: any[] = [
        {
            _id: "1",
            issueKey: "TEST-123",
            published: true,
            status: "Completed",
            mode: "Manual",
            email: user ? user.email : "test@qa.vn",
            createdAt: new Date(Date.now() -2 *24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            generationTimeSeconds: 45.3,
            cost: 0.0045,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    View and manage your test case generations
                </p>
            </div>
            {/* Generations List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Key</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((g) => (
                                <tr key={g._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-3 whitespace-nowrap">{g.issueKey}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{g.status}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{g.mode}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{g.email}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{formatDate(g.createdAt)}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{g.generationTimeSeconds}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">{g.cost}</td>
                                    <td className="px-6 py-3 whitespace-nowrap">View</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
