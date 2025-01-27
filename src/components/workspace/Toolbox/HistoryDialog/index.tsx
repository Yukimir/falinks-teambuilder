import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { AppConfig } from '@/utils/AppConfig';

export function HistoryDialog() {
  const { teamState } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLLabelElement>(null);

  // add a listener to update team state when received a new state
  useEffect(() => {
    // disable the listener for mobile devices
    if (window.innerWidth < 768) return;
    const lastHistory = teamState.history[teamState.history.length - 1];
    if (lastHistory) {
      toast(lastHistory, {
        position: 'top-right',
      });
    }
  }, [teamState.history.length]);

  // lazy load showdown
  useEffect(() => {
    if (!isOpen) return;
    if (modalRef.current) {
      modalRef.current.scrollLeft = 100000; // rtl
    }
  }, [isOpen]);

  return (
    <>
      <input
        type="checkbox"
        id={AppConfig.toolboxIDs.historyModal}
        className="modal-toggle"
        onChange={(e) => {
          setIsOpen(e.target.checked);
        }}
      />
      {/* Right-side drawer implemented with rtl modal, allowing to click outside to close */}
      <label htmlFor={AppConfig.toolboxIDs.historyModal} className="modal-right modal" ref={modalRef}>
        <label className="modal-box" dir="rtl" htmlFor="">
          <label htmlFor={AppConfig.toolboxIDs.historyModal} className="btn-sm btn-circle btn absolute left-1.5 top-1.5">
            ✕
          </label>
          <div className="ml-2 mt-2" dir="ltr">
            <h3 className="text-lg font-bold">Edit History</h3>
            <ul className="steps steps-vertical">
              {teamState.history.map((change, idx) => (
                <li key={idx} className="step-primary step text-xs">
                  {change}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="modal-action"
            onClick={() => {
              teamState.clearHistory();
            }}
          >
            <button className="btn-primary btn-sm btn">Clear</button>
          </div>
        </label>
      </label>
    </>
  );
}
