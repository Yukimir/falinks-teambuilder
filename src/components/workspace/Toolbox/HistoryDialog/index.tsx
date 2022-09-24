import { useContext, useEffect, useRef, useState } from 'react';

import { StoreContext } from '@/components/workspace/Contexts/StoreContext';

export function HistoryDialog() {
  const { teamState } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [historyLiteralList, setHistoryLiteralList] = useState<string[]>([]);
  const modalRef = useRef<HTMLLabelElement>(null);

  // lazy load showdown
  useEffect(() => {
    if (!isOpen) return;
    if (modalRef.current) {
      modalRef.current.scrollLeft = 100000; // rtl
    }
    setHistoryLiteralList(teamState.historyLiteral); // lazy load
  }, [isOpen]);

  return (
    <>
      <input
        type="checkbox"
        id="history-modal"
        className="modal-toggle"
        onChange={(e) => {
          setIsOpen(e.target.checked);
        }}
      />
      {/* Right-side drawer implemented with rtl modal, allowing to click outside to close */}
      <label htmlFor="history-modal" className="modal-right modal" ref={modalRef}>
        <label className="modal-box" dir="rtl" htmlFor="">
          <label htmlFor="history-modal" className="btn-sm btn-circle btn absolute left-1.5 top-1.5">
            ✕
          </label>
          <div className="ml-2 mt-2" dir="ltr">
            <h3 className="text-lg font-bold">Edit History</h3>
            <ul className="steps steps-vertical">
              {historyLiteralList.map((change, idx) => (
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
              setHistoryLiteralList([]);
            }}
          >
            <button className="btn-primary btn-sm btn">Clear</button>
          </div>
        </label>
      </label>
    </>
  );
}
