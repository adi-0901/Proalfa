import * as React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"

const tools = [
  {
    title: "PEB Material Tracker",
    description: "Track and manage PEB material weights and quantities for ongoing projects.",
    href: "/staff/peb-tracker.html",
    access: "All Staff",
    icon: "📦",
  },
  {
    title: "Store Room Tracker",
    description: "Monitor store room inventory, stock movements, and item locations.",
    href: "/staff/store-room.html",
    access: "All Staff",
    icon: "🗄️",
  },
  {
    title: "HR Dashboard",
    description: "Employee KYC, documents, onboarding, attendance and salary. Management access only.",
    href: "/staff/hr.html",
    access: "Management",
    icon: "👥",
  },
  {
    title: "Policy Library",
    description: "Company policies, SOPs, roles, production milestones and operational guidelines.",
    href: "/staff/policies.html",
    access: "All Staff",
    icon: "📋",
  },
]

const StaffPage = () => {
  return (
    <div className="min-h-screen bg-[#111] text-[#e5e5e5] flex flex-col">
      <Seo
        title="Staff Portal"
        description="Internal staff tools for Proalfa Dynamic employees."
        meta={[{ name: "robots", content: "noindex, nofollow" }]}
      />

      <div className="px-8 md:px-16 py-16 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="text-[10px] uppercase tracking-[0.3em] text-[#555] hover:text-[#999] transition-colors mb-12 inline-block"
          >
            ← Proalfa Dynamic
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-[#e5e5e5]">Staff Portal</h1>
          <p className="text-[#555] text-sm mb-12">
            Internal tools for Proalfa Dynamic employees. These pages are not public.
          </p>

          <div className="flex flex-col gap-4">
            {tools.map(tool => (
              <a
                key={tool.title}
                href={tool.href}
                className="group block border border-[#2a2a2a] rounded-lg p-6 hover:border-[#444] transition-colors duration-200 bg-[#161616]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl leading-none mt-0.5 shrink-0">{tool.icon}</span>
                    <div>
                      <h2 className="text-base font-semibold text-[#e5e5e5] group-hover:text-white transition-colors mb-1">
                        {tool.title}
                      </h2>
                      <p className="text-[#666] text-sm leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${
                      tool.access === "Management"
                        ? "border-[#4a3a1a] text-[#c9a84c] bg-[#1e1a10]"
                        : "border-[#1a3a2a] text-[#4caa7a] bg-[#101e18]"
                    }`}
                  >
                    {tool.access}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p className="text-[#3a3a3a] text-xs mt-12">
            This page is not indexed by search engines. Share directly with staff.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StaffPage
