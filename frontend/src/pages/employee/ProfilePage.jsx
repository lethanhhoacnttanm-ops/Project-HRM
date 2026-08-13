import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, User, Lock, Save, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { employeeService } from "@/services/employee.service";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user, handleLogin } = useAuth(); // dùng để refresh user sau khi update
  const [activeTab, setActiveTab] = useState("profile"); // profile | account
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile form
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "Nam",
    dateOfBirth: "",
    identityCard: "",
    employeeCode: "",
    avatar: "",
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await employeeService.getMyProfile();
        const data = res.data;

        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "Nam",
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : "",
          identityCard: data.identityCard || "",
          employeeCode: data.code || "", // ← DB dùng `code`
          avatar: data.avatarUrl || "", // ← DB dùng `avatarUrl`
          position: data.position || "",
        });
      } catch (error) {
        toast.error("Không thể tải hồ sơ", {
          description: error.customMessage || error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit profile
  const onSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        fullName: profile.fullName,
        phone: profile.phone,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth || undefined,
        avatar: profile.avatar,
      };

      const res = await employeeService.updateMyProfile(payload);
      toast.success("Cập nhật hồ sơ thành công!");

      // Cập nhật lại state local
      if (res.data) {
        setProfile((prev) => ({
          ...prev,
          fullName: res.data.fullName || prev.fullName,
          phone: res.data.phone || prev.phone,
          gender: res.data.gender || prev.gender,
        }));
      }
    } catch (error) {
      toast.error("Cập nhật thất bại", {
        description: error.customMessage || error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  // Submit change password
  const onChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setSaving(true);
      await employeeService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      toast.success("Đổi mật khẩu thành công!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại", {
        description: error.customMessage || error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hồ sơ & Tài khoản</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Quản lý thông tin cá nhân và bảo mật tài khoản
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="size-4" />
          Hồ sơ cá nhân
        </button>
        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "account"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Lock className="size-4" />
          Tài khoản
        </button>
      </div>

      {/* Tab: Profile */}
      {activeTab === "profile" && (
        <form
          onSubmit={onSaveProfile}
          className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Mã nhân viên</Label>
              <Input
                value={profile.employeeCode}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={profile.email} disabled className="bg-muted" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>
            <div className="space-y-1.5">
              <Label>CCCD / CMND</Label>
              <Input
                value={profile.identityCard}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <Label>Giới tính</Label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {["Nam", "Nữ", "Khác"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setProfile((p) => ({ ...p, gender: g }))}
                  className={`h-9 rounded-lg border text-sm font-medium transition-all ${
                    profile.gender === g
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Tab: Account (Đổi mật khẩu) */}
      {activeTab === "account" && (
        <form
          onSubmit={onChangePassword}
          className="space-y-5 rounded-xl border bg-white p-6 shadow-sm max-w-md"
        >
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
                className="pr-9"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                className="pr-9"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="pr-9"
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đổi mật khẩu"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
