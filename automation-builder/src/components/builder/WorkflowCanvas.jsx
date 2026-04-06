import { Plus } from 'lucide-react'
import { useWorkflow } from '../../context/WorkflowContext'
import StepCard from './StepCard'

export default function WorkflowCanvas({ onAddStep }) {
  const { currentWorkflow, selectedStepId, setSelectedStepId, removeStep, moveStep } = useWorkflow()

  const steps = currentWorkflow?.steps || []

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {steps.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
            <Plus className="w-7 h-7 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Start Building</h3>
          <p className="text-sm text-slate-400 mb-6 max-w-xs">
            Add your first step to begin creating your AI automation workflow
          </p>
          <button
            onClick={onAddStep}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add First Step
          </button>
        </div>
      ) : (
        <div className="max-w-lg mx-auto space-y-0">
          {steps.map((step, index) => (
            <div key={step.id}>
              <StepCard
                step={step}
                index={index}
                isSelected={selectedStepId === step.id}
                onSelect={() => setSelectedStepId(step.id)}
                onRemove={() => removeStep(step.id)}
                onMoveUp={() => index > 0 && moveStep(index, index - 1)}
                onMoveDown={() => index < steps.length - 1 && moveStep(index, index + 1)}
                isFirst={index === 0}
                isLast={index === steps.length - 1}
              />
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-0.5 h-8 bg-white/10" />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center pt-4">
            <button
              onClick={onAddStep}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-white/20 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 text-sm rounded-lg transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
