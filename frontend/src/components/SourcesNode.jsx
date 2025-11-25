import { Handle, Position } from '@xyflow/react';
import './SourcesNode.css';

/**
 * SourcesNode - Displays web search results/sources
 * Color-coded orange as per the proposal
 */
function SourcesNode({ data }) {
  const sources = data.sources || [];

  return (
    <div className="sources-node">
      <div className="sources-node-header">
        <span className="sources-node-icon">🔗</span>
        <span className="sources-node-label">Sources</span>
      </div>
      
      <div className="sources-node-content">
        {sources.length > 0 ? (
          sources.map((source, index) => (
            <a 
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              <span className="source-index">{index + 1}</span>
              <span className="source-title">{source.title || source.url}</span>
            </a>
          ))
        ) : (
          <div className="sources-placeholder">
            {data.label || 'Sources will appear here'}
          </div>
        )}
      </div>
      
      {/* Input handle - connects from answer nodes */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="sources-handle"
      />
    </div>
  );
}

export default SourcesNode;
