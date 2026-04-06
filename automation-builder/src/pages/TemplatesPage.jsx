import { useNavigate } from 'react-router-dom'
import { templates } from '../data/templates'
import { useWorkflow } from '../context/WorkflowContext'
import TemplateCard from '../components/templates/TemplateCard'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const { createWorkflow } = useWorkflow()

  const handleUseTemplate = (template) => {
    const wf = createWorkflow(template.name, template.steps)
    navigate(`/builder/${wf.id}`)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Templates</h1>
        <p className="text-slate-400 text-sm mt-1">
          Get started quickly with pre-built automation templates
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} onUse={handleUseTemplate} />
        ))}
      </div>
    </div>
  )
}
