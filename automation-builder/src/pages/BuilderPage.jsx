import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, ArrowLeft, Pencil, Check } from 'lucide-react'
import { useWorkflow } from '../context/WorkflowContext'
import WorkflowCanvas from '../components/builder/WorkflowCanvas'
import StepConfigPanel from '../components/builder/StepConfigPanel'
import StepTypeSelector from '../components/builder/StepTypeSelector'

export default function BuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentWorkflow,
    createWorkflow,
    loadWorkflow,
    addStep,
    saveWorkflow,
    updateWorkflowName,
  } = useWorkflow()

  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (id) {
      const loaded = loadWorkflow(id)
      if (!loaded) {
        navigate('/builder')
      }
    } else if (!currentWorkflow) {
      createWorkflow()
    }
  }, [id])

  useEffect(() => {
    if (currentWorkflow) {
      setNameValue(currentWorkflow.name)
    }
  }, [currentWorkflow?.name])

  const handleAddStep = (type) => {
    const defaultConfigs = {
      trigger: { triggerType: 'webhook', label: '' },
      'ai-process': { model: 'gpt-4', prompt: '', temperature: 0.7 },
      output: { outputType: 'email' },
    }
    addStep(type, defaultConfigs[type] || {})
    setShowTypeSelector(false)
  }

  const handleSave = () => {
    saveWorkflow()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleNameSubmit = () => {
    if (nameValue.trim()) {
      updateWorkflowName(nameValue.trim())
    }
    setEditingName(false)
  }

  if (!currentWorkflow) return null

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col -m-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#12121a]/50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition cursor-pointer"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
                className="px-2 py-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleNameSubmit}
                className="p-1 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                aria-label="Save name"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-indigo-300 transition cursor-pointer"
            >
              {currentWorkflow.name}
              <Pencil className="w-3 h-3 text-slate-500" />
            </button>
          )}
          <span className="text-xs text-slate-500">
            {currentWorkflow.steps.length} step{currentWorkflow.steps.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
            saved
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Workflow'}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[7] border-r border-white/10 flex flex-col">
          <WorkflowCanvas onAddStep={() => setShowTypeSelector(true)} />
        </div>
        <div className="flex-[3] bg-[#12121a]/50">
          <StepConfigPanel />
        </div>
      </div>

      {showTypeSelector && (
        <StepTypeSelector
          onSelect={handleAddStep}
          onClose={() => setShowTypeSelector(false)}
        />
      )}
    </div>
  )
}
