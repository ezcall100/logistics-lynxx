import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

export type PortalLink = {
  name: string
  icon: React.ReactNode
  path: string
  colorClass?: string
  description?: string
}

const DEFAULT_PORTALS: PortalLink[] = [
  { name: 'Carrier Portal', icon: '🚛', path: '/carrier/*', colorClass: 'border-blue-500', description: 'Fleet management and operations' },
  { name: 'Broker Portal', icon: '🏢', path: '/broker/*', colorClass: 'border-emerald-500', description: 'Load matching and carrier management' },
  { name: 'Shipper Portal', icon: '📦', path: '/shipper/*', colorClass: 'border-amber-500', description: 'Shipment creation and tracking' },
  { name: 'Driver Portal', icon: '🚗', path: '/driver/*', colorClass: 'border-pink-500', description: 'Trip workflow and settlements' },
  { name: 'Owner Operator', icon: '🚚', path: '/owner-operator/*', colorClass: 'border-violet-500', description: 'Independent business hub' },
  { name: 'Super Admin', icon: '👑', path: '/super-admin/*', colorClass: 'border-purple-600', description: 'Global administration' },
  { name: 'Autonomous AI', icon: '🤖', path: '/autonomous/*', colorClass: 'border-indigo-500', description: 'No-human ops control center' },
  { name: 'Analytics', icon: '📊', path: '/analytics/*', colorClass: 'border-cyan-500', description: 'BI and performance insights' },
  { name: 'Software Admin', icon: '⚙️', path: '/admin/software-admin', colorClass: 'border-slate-500', description: 'Tenant and system admin' },
  { name: 'Factoring', icon: '💰', path: '/factoring/*', colorClass: 'border-yellow-500', description: 'Invoice factoring services' },
  { name: 'Financials', icon: '💳', path: '/financials/*', colorClass: 'border-green-500', description: 'Financial management' },
  { name: 'Rates', icon: '💰', path: '/rates/*', colorClass: 'border-orange-500', description: 'Rate management and quoting' },
  { name: 'Load Board', icon: '📋', path: '/load-board/*', colorClass: 'border-red-500', description: 'Find and post loads' },
  { name: 'Workers', icon: '👷', path: '/workers/*', colorClass: 'border-lime-500', description: 'Workforce and compliance' },
  { name: 'CRM', icon: '👥', path: '/crm/*', colorClass: 'border-cyan-500', description: 'Relationships and pipeline' },
  { name: 'Directory', icon: '📚', path: '/directory/*', colorClass: 'border-slate-400', description: 'Companies and contacts' },
  { name: 'EDI', icon: '📡', path: '/edi/*', colorClass: 'border-purple-600', description: 'B2B integrations' },
  { name: 'Marketplace', icon: '🛒', path: '/marketplace/*', colorClass: 'border-orange-500', description: 'Apps and services' },
  { name: 'Testing', icon: '🧪', path: '/testing/*', colorClass: 'border-lime-500', description: 'QA tools and suites' },
  { name: 'Master Autonomous Agent', icon: '🤖', path: '/master-autonomous-agent', colorClass: 'border-purple-600', description: 'Orchestrator' },
]

type AccessAllPortalsProps = {
  title?: string
  portals?: PortalLink[]
}

export function AccessAllPortals({ title = 'Access All Portals', portals = DEFAULT_PORTALS }: AccessAllPortalsProps) {
  return (
    <section className="mb-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">🌐 {title}</h2>
        <p className="text-muted-foreground text-sm md:text-base">Choose a portal to continue</p>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TooltipProvider delayDuration={0}>
          {portals.map((portal) => (
            <Tooltip key={portal.name}>
              <TooltipTrigger asChild>
                <Link to={portal.path} aria-label={`Open ${portal.name}`} className="focus:outline-none">
                  <Card className={`h-full hover:shadow-md transition-shadow border-l-4 ${portal.colorClass || 'border-primary'}`}>
                    <CardHeader className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl md:text-3xl" aria-hidden>{portal.icon}</div>
                        <div className="min-w-0">
                          <CardTitle className="text-base md:text-lg truncate">{portal.name}</CardTitle>
                          <CardDescription className="truncate">{portal.description || 'Click to access'}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">Portal</Badge>
                      <span className="text-xs text-muted-foreground">Open →</span>
                    </CardContent>
                  </Card>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Click to open {portal.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <Separator className="mt-6" />
    </section>
  )
}

export default AccessAllPortals
