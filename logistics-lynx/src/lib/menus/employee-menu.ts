/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuSection } from '@/lib/types/menu';
import { Settings, Shield, Bell, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export const EMPLOYEE_MENU: MenuSection = {
  items: [
    {
      title: "Employee Dashboard",
      icon: LayoutDashboard,
      path: "/employee/dashboard",
    },
    {
      title: "My Tasks",
      icon: ClipboardList,
      subMenu: [
        { title: "Task Overview", icon: LayoutDashboard, path: "/employee/tasks/overview" },
        { title: "Assigned Tasks", icon: UserCheck, path: "/employee/tasks/assigned" },
        { title: "In Progress", icon: Activity, path: "/employee/tasks/progress" },
        { title: "Completed Tasks", icon: CheckCircle, path: "/employee/tasks/completed" },
        { title: "Overdue Tasks", icon: AlertTriangle, path: "/employee/tasks/overdue" },
      ],
    },
    {
      title: "Time Management",
      icon: Clock,
      subMenu: [
        { title: "Time Tracking", icon: Clock, path: "/employee/time/tracking" },
        { title: "Timesheet", icon: FileText, path: "/employee/time/timesheet" },
        { title: "Schedule", icon: Calendar, path: "/employee/time/schedule" },
        { title: "Time Off Requests", icon: Coffee, path: "/employee/time/requests" },
        { title: "Overtime Tracking", icon: TrendingUp, path: "/employee/time/overtime" },
      ],
    },
    {
      title: "Communications",
      icon: MessageSquare,
      subMenu: [
        { title: "Team Chat", icon: MessageSquare, path: "/employee/comm/chat" },
        { title: "Email Center", icon: Mail, path: "/employee/comm/email" },
        { title: "Announcements", icon: Bell, path: "/employee/comm/announcements" },
        { title: "Company Directory", icon: Users, path: "/employee/comm/directory" },
        { title: "Internal Calls", icon: Phone, path: "/employee/comm/calls" },
      ],
    },
    {
      title: "Projects & Work",
      icon: Briefcase,
      subMenu: [
        { title: "My Projects", icon: Briefcase, path: "/employee/work/projects" },
        { title: "Shipment Support", icon: Package, path: "/employee/work/shipments" },
        { title: "Customer Service", icon: Users, path: "/employee/work/customer-service" },
        { title: "Documentation", icon: FileText, path: "/employee/work/documentation" },
        { title: "Quality Assurance", icon: CheckCircle, path: "/employee/work/qa" },
      ],
    },
    {
      title: "Training & Development",
      icon: BookOpen,
      subMenu: [
        { title: "Training Modules", icon: BookOpen, path: "/employee/training/modules" },
        { title: "Certifications", icon: Award, path: "/employee/training/certifications" },
        { title: "Skill Assessment", icon: Target, path: "/employee/training/assessment" },
        { title: "Career Path", icon: TrendingUp, path: "/employee/training/career" },
        { title: "Learning Resources", icon: FileText, path: "/employee/training/resources" },
      ],
    },
    {
      title: "Performance",
      icon: BarChart3,
      subMenu: [
        { title: "Performance Dashboard", icon: BarChart3, path: "/employee/performance/dashboard" },
        { title: "Goals & Objectives", icon: Target, path: "/employee/performance/goals" },
        { title: "Performance Reviews", icon: Award, path: "/employee/performance/reviews" },
        { title: "Feedback & 360", icon: MessageSquare, path: "/employee/performance/feedback" },
        { title: "Recognition", icon: Award, path: "/employee/performance/recognition" },
      ],
    },
    {
      title: "HR Services",
      icon: Users,
      subMenu: [
        { title: "Employee Profile", icon: UserCheck, path: "/employee/hr/profile" },
        { title: "Benefits", icon: Heart, path: "/employee/hr/benefits" },
        { title: "Payroll Information", icon: DollarSign, path: "/employee/hr/payroll" },
        { title: "Expense Reports", icon: CreditCard, path: "/employee/hr/expenses" },
        { title: "HR Requests", icon: ClipboardList, path: "/employee/hr/requests" },
      ],
    },
    {
      title: "Tools & Resources",
      icon: Wrench,
      subMenu: [
        { title: "Company Tools", icon: Wrench, path: "/employee/tools/company" },
        { title: "File Storage", icon: Upload, path: "/employee/tools/storage" },
        { title: "Forms & Templates", icon: FileText, path: "/employee/tools/forms" },
        { title: "Policy Handbook", icon: BookOpen, path: "/employee/tools/handbook" },
        { title: "IT Support", icon: Shield, path: "/employee/tools/it-support" },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: PieChart,
      subMenu: [
        { title: "My Reports", icon: PieChart, path: "/employee/reports/my-reports" },
        { title: "Team Performance", icon: Users, path: "/employee/reports/team" },
        { title: "Work Analytics", icon: Activity, path: "/employee/reports/analytics" },
        { title: "Time Reports", icon: Clock, path: "/employee/reports/time" },
      ],
    },
    {
      title: "Employee Settings",
      icon: Settings,
      subMenu: [
        { title: "Profile Settings", icon: UserCheck, path: "/employee/settings/profile" },
        { title: "Notification Preferences", icon: Bell, path: "/employee/settings/notifications" },
        { title: "Privacy Settings", icon: Shield, path: "/employee/settings/privacy" },
        { title: "Communication Preferences", icon: MessageSquare, path: "/employee/settings/communication" },
      ],
    },
  ],
};