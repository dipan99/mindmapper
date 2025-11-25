import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import QueryNode from './QueryNode';
import AnswerNode from './AnswerNode';
import SourcesNode from './SourcesNode';
import './MindMapCanvas.css';

// Register custom node types
const nodeTypes = {
  query: QueryNode,
  answer: AnswerNode,
  sources: SourcesNode,
};

// Demo initial nodes to showcase the interface
const initialNodes = [
  {
    id: 'query-1',
    type: 'query',
    position: { x: 250, y: 50 },
    data: { label: 'What is Climate Change?' },
  },
  {
    id: 'answer-1',
    type: 'answer',
    position: { x: 200, y: 180 },
    data: {
      bullets: [
        'Greenhouse gas emissions are the main driver of rising global temperatures',
        'Sea level rise threatens coastal communities and biodiversity',
        'International agreements like Paris Accord aim to limit temperature increases',
        'Low-lying cities face frequent flooding and infrastructure loss',
      ],
    },
  },
];

const initialEdges = [
  {
    id: 'e-query1-answer1',
    source: 'query-1',
    target: 'answer-1',
    animated: true,
    style: { stroke: '#2196f3', strokeWidth: 2 },
  },
];

// Custom edge styling
const defaultEdgeOptions = {
  style: { strokeWidth: 2 },
  type: 'smoothstep',
};

function MindMapCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showQueryInput, setShowQueryInput] = useState(false);
  const [newQueryText, setNewQueryText] = useState('');
  const [nodeIdCounter, setNodeIdCounter] = useState(2);

  // Handle edge connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  // Generate unique ID
  const getNextId = useCallback((prefix) => {
    const id = `${prefix}-${nodeIdCounter}`;
    setNodeIdCounter((prev) => prev + 1);
    return id;
  }, [nodeIdCounter]);

  // Add a new root query node
  const addQueryNode = useCallback(() => {
    if (!newQueryText.trim()) return;

    const newNode = {
      id: getNextId('query'),
      type: 'query',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 50 },
      data: { label: newQueryText },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewQueryText('');
    setShowQueryInput(false);

    // In a real implementation, this would trigger an API call
    // and create an answer node with the response
    simulateAnswer(newNode.id, newQueryText);
  }, [newQueryText, getNextId, setNodes]);

  // Simulate an LLM response (placeholder for real API integration)
  const simulateAnswer = useCallback((queryId, queryText) => {
    setTimeout(() => {
      const answerId = getNextId('answer');
      
      // Get the query node's position
      setNodes((nds) => {
        const queryNode = nds.find((n) => n.id === queryId);
        if (!queryNode) return nds;

        const answerNode = {
          id: answerId,
          type: 'answer',
          position: {
            x: queryNode.position.x - 20,
            y: queryNode.position.y + 150,
          },
          data: {
            bullets: [
              `This is a simulated response to: "${queryText}"`,
              'In the full implementation, this would be an LLM response',
              'Each bullet can be expanded, sourced, or queried further',
              'The context is maintained per branch using RAG',
            ],
            onExpand: handleExpand,
            onSources: handleSources,
            onCustomQuery: handleCustomQuery,
          },
        };

        return [...nds, answerNode];
      });

      // Add edge from query to answer
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${queryId}-${answerId}`,
          source: queryId,
          target: answerId,
          animated: true,
          style: { stroke: '#2196f3', strokeWidth: 2 },
        },
      ]);
    }, 500);
  }, [getNextId, setNodes, setEdges]);

  // Handle bullet expansion
  const handleExpand = useCallback((nodeId, bulletIndex, bulletText) => {
    console.log('Expand:', nodeId, bulletIndex, bulletText);
    // TODO: Implement expansion - creates new query + answer node
  }, []);

  // Handle sources lookup
  const handleSources = useCallback((nodeId, bulletIndex, bulletText) => {
    console.log('Sources:', nodeId, bulletIndex, bulletText);
    // TODO: Implement web search - creates sources node
  }, []);

  // Handle custom query from bullet
  const handleCustomQuery = useCallback((nodeId, bulletIndex, bulletText) => {
    console.log('Custom Query:', nodeId, bulletIndex, bulletText);
    // TODO: Implement custom query - opens input, creates query node
  }, []);

  // Update existing answer nodes with handlers
  const nodesWithHandlers = nodes.map((node) => {
    if (node.type === 'answer') {
      return {
        ...node,
        data: {
          ...node.data,
          onExpand: handleExpand,
          onSources: handleSources,
          onCustomQuery: handleCustomQuery,
        },
      };
    }
    return node;
  });

  return (
    <div className="mindmap-canvas-container">
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
      >
        <Background color="#94a3b8" gap={20} size={1} />
        <Controls position="bottom-right" />
        <MiniMap 
          position="bottom-left"
          nodeColor={(node) => {
            switch (node.type) {
              case 'query': return '#4caf50';
              case 'answer': return '#2196f3';
              case 'sources': return '#ff9800';
              default: return '#64748b';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        
        {/* Top panel with add query button */}
        <Panel position="top-left" className="canvas-panel">
          <div className="panel-content">
            <h1 className="panel-title">🧠 MindMapper</h1>
            <p className="panel-subtitle">Visual LLM Interaction Canvas</p>
            
            {showQueryInput ? (
              <div className="query-input-wrapper">
                <textarea
                  value={newQueryText}
                  onChange={(e) => setNewQueryText(e.target.value)}
                  placeholder="Enter your question..."
                  className="query-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addQueryNode();
                    }
                  }}
                />
                <div className="query-input-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={addQueryNode}
                  >
                    Add Query
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowQueryInput(false);
                      setNewQueryText('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-add-query"
                onClick={() => setShowQueryInput(true)}
              >
                + New Query
              </button>
            )}
          </div>
        </Panel>

        {/* Legend panel */}
        <Panel position="top-right" className="legend-panel">
          <div className="legend-item">
            <span className="legend-color query"></span>
            <span>Query</span>
          </div>
          <div className="legend-item">
            <span className="legend-color answer"></span>
            <span>Answer</span>
          </div>
          <div className="legend-item">
            <span className="legend-color sources"></span>
            <span>Sources</span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default MindMapCanvas;
