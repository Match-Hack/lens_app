import Home from './conversation/[conv]'
import StartConversation  from './create';
export default function ConvLoader() {
  
    return (
      <div className="main">
        <div className="description-container">
          <div className="description">
            <StartConversation></StartConversation>
          </div>
        </div>
      </div>
    );
  }