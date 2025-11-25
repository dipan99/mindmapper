import { Handle, Position } from '@xyflow/react';
import './QueryNode.css';

/**
 * QueryNode - Represents a user's query/prompt on the canvas
 * Color-coded green as per the proposal
 */
function QueryNode({ data }) {
  return (
    <div className="query-node">
      <div className="query-node-header">
        <span className="query-node-icon">❓</span>
        <span className="query-node-label">Query</span>
      </div>
      <div className="query-node-content">
        {data.label}
      </div>
      
      {/* Input handle - connects from parent nodes */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="query-handle"
      />
      
      {/* Output handle - connects to answer nodes */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="query-handle"
      />
    </div>
  );
}

export default QueryNode;
