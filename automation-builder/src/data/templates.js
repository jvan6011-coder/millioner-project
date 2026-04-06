export const templates = [
  {
    id: 'email-responder',
    name: 'Email Responder',
    description: 'Automatically respond to incoming emails using AI to draft personalized replies based on email content and context.',
    icon: 'Mail',
    steps: [
      {
        id: 'step-1',
        type: 'trigger',
        config: {
          triggerType: 'webhook',
          label: 'Incoming Email Webhook',
          webhookUrl: 'https://hooks.autoflow.ai/email-inbound',
        },
      },
      {
        id: 'step-2',
        type: 'ai-process',
        config: {
          model: 'gpt-4',
          prompt: 'You are an email assistant. Read the incoming email and draft a professional, helpful reply. Match the tone of the sender. Keep it concise.',
          temperature: 0.7,
        },
      },
      {
        id: 'step-3',
        type: 'output',
        config: {
          outputType: 'email',
          subject: 'Re: {{original_subject}}',
          recipient: '{{sender_email}}',
        },
      },
    ],
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Generate blog posts, social media content, and marketing copy on a scheduled basis using AI models.',
    icon: 'FileText',
    steps: [
      {
        id: 'step-1',
        type: 'trigger',
        config: {
          triggerType: 'schedule',
          label: 'Daily Content Schedule',
          cronExpression: '0 9 * * 1-5',
        },
      },
      {
        id: 'step-2',
        type: 'ai-process',
        config: {
          model: 'gpt-4',
          prompt: 'Generate a professional blog post about the latest trends in AI and automation. Include a catchy title, introduction, 3 main points, and a conclusion. Target length: 800 words.',
          temperature: 0.8,
        },
      },
      {
        id: 'step-3',
        type: 'output',
        config: {
          outputType: 'webhook',
          webhookUrl: 'https://api.cms.example.com/posts',
          method: 'POST',
        },
      },
    ],
  },
  {
    id: 'data-processor',
    name: 'Data Processor',
    description: 'Process and transform incoming data payloads using AI to extract insights, classify content, and generate structured reports.',
    icon: 'Database',
    steps: [
      {
        id: 'step-1',
        type: 'trigger',
        config: {
          triggerType: 'webhook',
          label: 'Data Ingestion Webhook',
          webhookUrl: 'https://hooks.autoflow.ai/data-ingest',
        },
      },
      {
        id: 'step-2',
        type: 'ai-process',
        config: {
          model: 'gpt-3.5-turbo',
          prompt: 'Analyze the incoming data payload. Extract key metrics, identify anomalies, classify the data type, and produce a structured JSON summary with fields: category, sentiment, key_entities, summary, and confidence_score.',
          temperature: 0.3,
        },
      },
      {
        id: 'step-3',
        type: 'output',
        config: {
          outputType: 'file',
          fileName: 'report_{{timestamp}}.json',
          format: 'JSON',
        },
      },
    ],
  },
]
