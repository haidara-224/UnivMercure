import { Roles } from "@/types";
import {
  Shield,
  UserCog,
  GraduationCap,
  Users,
  Bookmark,
  BookOpen,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

const roleConfig: Record<string, {
  bg: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  "admin": {
    bg: "bg-gradient-to-br from-red-50 to-rose-50",
    text: "text-rose-600",
    icon: ShieldCheck
  },
  "personnel": {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    text: "text-indigo-600",
    icon: UserCog
  },
  "etudiant": {
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    text: "text-emerald-600",
    icon: GraduationCap
  },
  "BDE": {
    bg: "bg-gradient-to-br from-purple-50 to-violet-50",
    text: "text-violet-600",
    icon: Users
  },
  "jc": {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    text: "text-amber-600",
    icon: Bookmark
  },
  "documentaliste": {
    bg: "bg-gradient-to-br from-cyan-50 to-sky-50",
    text: "text-sky-600",
    icon: BookOpen
  },
  "forum": {
    bg: "bg-gradient-to-br from-gray-50 to-slate-50",
    text: "text-slate-600",
    icon: MessageSquare
  },
  "super admin": {
    bg: "bg-gradient-to-br from-rose-50 to-pink-50",
    text: "text-pink-600",
    icon: Shield
  },
  "default": {
    bg: "bg-gray-50",
    text: "text-gray-600",
    icon: Shield
  }
};

const RoleBadge = ({ role }: { role: Roles }) => {
  const config = roleConfig[role.name] || roleConfig.default;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center text-xs px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3 mr-1.5" />
      {role.name}
    </span>
  );
};

export default RoleBadge;
