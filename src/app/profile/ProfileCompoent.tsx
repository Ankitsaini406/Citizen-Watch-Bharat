import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {UserData} from "@/types/type";
import { toast } from "sonner";
import {Edit3, Shield} from "lucide-react";

export function EditProfileDialog({user, onSave}: {
    user: UserData;
    onSave: (data: UserData) => void;
}) {
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phonenumber || "");
    const [address, setAddress] = useState(user.address || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phonenumber: phone, address }),
            });
            if (!res.ok) {
                toast.error("Failed to update profile");
                return;
            }
            const updated = await res.json();
            onSave(updated);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full flex items-center justify-center h-12 px-4 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-700 mb-4">Edit Personal Details</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!loading) handleSave();
                    }}
                    className="space-y-6"
                >
                    <div>
                        <span className="block mb-1 font-medium text-gray-600">Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <span className="block mb-1 font-medium text-gray-600">Phone Number</span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 234 567 890"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <span className="block mb-1 font-medium text-gray-600">Address</span>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Your address"
                            rows={3}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400 resize-none"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className={`w-full py-3 rounded-md text-white font-semibold transition ${
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function ChangePasswordDialog() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            if (!res.ok) {
                toast.error("Failed to change password");
                return;
            }
            toast.success("Password changed successfully");
            setOldPassword("");
            setNewPassword("");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Password change failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full flex items-center justify-center h-12 px-4 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <Shield className="h-5 w-5 mr-2" />
                    Change Password
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-700 mb-4">Change Password</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!loading) await handleChangePassword();
                    }}
                    className="space-y-6"
                >
                    <div>
                        <span className="block mb-1 font-medium text-gray-600">Old Password</span>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            placeholder="Enter old password"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <span className="block mb-1 font-medium text-gray-600">New Password</span>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder="Enter new password"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md text-white font-semibold transition ${
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
