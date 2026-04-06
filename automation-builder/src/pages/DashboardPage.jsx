import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import StatsBar from '../components/dashboard/StatsBar'
import AutomationCard from '../components/dashboard/AutomationCard'
import { mockAutomations, mockStats } from '../data/mockAutomations'
import { useWorkflow } from '../context/WorkflowContext'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { workflows, createWorkflow } = useWorkflow()

  const savedAutomations = workflows.map((wf) => ({
    id: wf.id,
    name: wf.name,
    status: 'active',
    triggerType: wf.steps[0]?.config?.triggerType || 'manual',
    lastRun: 'Never',
    totalRuns: 0,
    successRate: 0,
    steps: wf.steps.length,
  }))

  const allAutomations = [...savedAutomations, ...mockAutomations]

  const stats = {
    totalWorkflows: mockStats.totalWorkflows + workflows.length,
    activeWorkflows: mockStats.activeWorkflows + workflows.length,
    totalRuns: mockStats.totalRuns,
    successRate: mockStats.successRate,
  }

  const handleNewWorkflow = () => {
    const wf = createWorkflow()
    navigate(`/builder/${wf.id}`)
  }

  const handleCardClick = (automation) => {
    if (automation.id.startsWith('wf-')) {
      navigate(`/builder/${automation.id}`)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and monitor your AI automations</p>
        </div>
        <button
          onClick={handleNewWorkflow}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          New Workflow
        </button>
      </div>

      <StatsBar stats={stats} />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Your Automations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allAutomations.map((auto) => (
            <AutomationCard
              key={auto.id}
              automation={auto}
              onClick={() => handleCardClick(auto)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
