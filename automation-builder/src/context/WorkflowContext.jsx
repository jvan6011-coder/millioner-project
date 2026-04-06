import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WorkflowContext = createContext(null)

function generateId() {
  return 'step-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)
}

function loadWorkflows() {
  try {
    const stored = localStorage.getItem('autoflow_workflows')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function persistWorkflows(workflows) {
  localStorage.setItem('autoflow_workflows', JSON.stringify(workflows))
}

export function WorkflowProvider({ children }) {
  const [workflows, setWorkflows] = useState(loadWorkflows)
  const [currentWorkflow, setCurrentWorkflow] = useState(null)
  const [selectedStepId, setSelectedStepId] = useState(null)

  useEffect(() => {
    persistWorkflows(workflows)
  }, [workflows])

  const createWorkflow = useCallback((name = 'Untitled Workflow', initialSteps = []) => {
    const workflow = {
      id: 'wf-' + Date.now(),
      name,
      steps: initialSteps.map((s) => ({ ...s, id: s.id || generateId() })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setWorkflows((prev) => [...prev, workflow])
    setCurrentWorkflow(workflow)
    setSelectedStepId(null)
    return workflow
  }, [])

  const loadWorkflow = useCallback((id) => {
    const wf = loadWorkflows().find((w) => w.id === id)
    if (wf) {
      setCurrentWorkflow(wf)
      setSelectedStepId(null)
    }
    return wf
  }, [])

  const addStep = useCallback((type, config = {}) => {
    const newStep = { id: generateId(), type, config }
    setCurrentWorkflow((prev) => {
      if (!prev) return prev
      const updated = {
        ...prev,
        steps: [...prev.steps, newStep],
        updatedAt: new Date().toISOString(),
      }
      return updated
    })
    return newStep
  }, [])

  const removeStep = useCallback((stepId) => {
    setCurrentWorkflow((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        steps: prev.steps.filter((s) => s.id !== stepId),
        updatedAt: new Date().toISOString(),
      }
    })
    setSelectedStepId((prev) => (prev === stepId ? null : prev))
  }, [])

  const updateStep = useCallback((stepId, config) => {
    setCurrentWorkflow((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        steps: prev.steps.map((s) =>
          s.id === stepId ? { ...s, config: { ...s.config, ...config } } : s
        ),
        updatedAt: new Date().toISOString(),
      }
    })
  }, [])

  const moveStep = useCallback((fromIndex, toIndex) => {
    setCurrentWorkflow((prev) => {
      if (!prev) return prev
      const steps = [...prev.steps]
      const [moved] = steps.splice(fromIndex, 1)
      steps.splice(toIndex, 0, moved)
      return { ...prev, steps, updatedAt: new Date().toISOString() }
    })
  }, [])

  const updateWorkflowName = useCallback((name) => {
    setCurrentWorkflow((prev) => {
      if (!prev) return prev
      return { ...prev, name, updatedAt: new Date().toISOString() }
    })
  }, [])

  const saveWorkflow = useCallback(() => {
    if (!currentWorkflow) return
    setWorkflows((prev) => {
      const idx = prev.findIndex((w) => w.id === currentWorkflow.id)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = currentWorkflow
        return updated
      }
      return [...prev, currentWorkflow]
    })
  }, [currentWorkflow])

  const deleteWorkflow = useCallback((id) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id))
    if (currentWorkflow?.id === id) {
      setCurrentWorkflow(null)
      setSelectedStepId(null)
    }
  }, [currentWorkflow])

  const selectedStep = currentWorkflow?.steps.find((s) => s.id === selectedStepId) || null

  return (
    <WorkflowContext.Provider
      value={{
        workflows,
        currentWorkflow,
        selectedStep,
        selectedStepId,
        setSelectedStepId,
        createWorkflow,
        loadWorkflow,
        addStep,
        removeStep,
        updateStep,
        moveStep,
        updateWorkflowName,
        saveWorkflow,
        deleteWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider')
  }
  return context
}
