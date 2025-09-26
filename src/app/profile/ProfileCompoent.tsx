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

export function EditProfileDialog({
                               user,
                               onSave,
                           }: {
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
            if (!res.ok) toast.error("Failed to update profile");
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
                <button className="w-full flex items-center h-12 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Edit3 className="h-4 w-4 mr-3" />
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Personal Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="mt-4 w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
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
            if (!res.ok) toast.error("Failed to change password");
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
                <button className="w-full flex items-center h-12 px-4 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Shield className="h-4 w-4 mr-3" />
                    Change Password
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleChangePassword}
                        disabled={loading}
                        className="mt-4 w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
