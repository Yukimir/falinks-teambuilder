import { useContext } from 'react';
import { toast } from 'react-hot-toast';

import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { AppConfig } from '@/utils/AppConfig';

function ShareLink() {
  const { teamState } = useContext(StoreContext);
  return (
    <button
      className="rounded"
      title="Share the current room link"
      onClick={() => {
        const url = window.location.href;
        try {
          navigator.share({
            url,
            title: `[${AppConfig.title}] ${teamState.metadata.title}`,
          });
        } catch (e) {
          navigator.clipboard.writeText(url).then(() => toast('📋 Link copied!'));
        }
      }}
    >
      <span>🔗</span>
      <span>Share Link</span>
    </button>
  );
}

export default ShareLink;