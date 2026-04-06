import { useWorkflow } from '../../context/WorkflowContext'
import TriggerStep from './TriggerStep'
import AIProcessStep from './AIProcessStep'
import OutputStep from './OutputStep'
import { Settings, X } from 'lucide-react'

const configComponents = {
  trigger: TriggerStep,
  'ai-process': AIProcessStep,
  output: OutputStep,
}

export default function StepConfigPanel() {
  const { selectedStep, updateStep, setSelectedStepId } = useWorkflow()

  if (!selectedStep) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
          <Settings className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-sm font-semibold text-white mb-1">No Step Selected</h3>
        <p className="text-xs text-slate-400">Click a step on the canvas to configure it</p>
      </div>
    )
  }

  const ConfigComponent = configComponents[selectedStep.type]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white capitalize">
          Configure {selectedStep.type.replace('-', ' ')}
        </h3>
        <button
          onClick={() => setSelectedStepId(null)}
          className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {ConfigComponent ? (
          <ConfigComponent
            config={selectedStep.config}
            onUpdate={(updates) => updateStep(selectedStep.id, updates)}
          />
        ) : (
          <p className="text-sm text-slate-400">No configuration available for this step type.</p>
        )}
      </div>
    </div>
  )
}
