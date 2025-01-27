import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FormatSelector } from '@/components/select/FormatSelector';
import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { AppConfig } from '@/utils/AppConfig';
import { Paste } from '@/utils/Prisma';

export function PostPokepasteDialog() {
  const { teamState } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, setValue, getValues } = useForm<NonNullable<Paste>>({
    defaultValues: {
      isOfficial: false,
      isPublic: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      setValue('author', (teamState.authors?.toJSON() || []).join(', '));
      setValue('notes', teamState.notes ?? '');
      setValue('paste', teamState.getTeamPaste());
      setValue('title', teamState.title || teamState.roomName || 'Falinks-teambuilder');
      setValue('format', teamState.format);
    }
  }, [isOpen]);

  const handleSubmitToFalinks = (isPublic: boolean) => {
    const data = { ...getValues(), isPublic };
    const promise = fetch(`/api/pastes/create`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    toast
      .promise(promise, {
        loading: 'Creating Paste...',
        success: 'Paste Created! Being show you in a new window...',
        error: (e) => `Error when creating your paste: ${e}`,
      })
      .then((r) => {
        if (r.url) {
          window.open(r.url, '_blank');
        }
      });
  };

  const copyHandler = () => {
    navigator.clipboard
      .writeText(getValues().paste)
      .then(() => {
        toast.success('📋 Copied!');
      })
      .catch((e) => {
        toast.error(`Failed to copy: ${e.message}`);
      });
  };

  return (
    <>
      <input
        type="checkbox"
        id={AppConfig.toolboxIDs.postModal}
        className="modal-toggle"
        onChange={(e) => {
          setIsOpen(e.target.checked);
        }}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" method="post" action="https://pokepast.es/create" target="_blank">
          <label htmlFor={AppConfig.toolboxIDs.postModal} className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input className="input-bordered input" type="text" {...register('title')} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input className="input-bordered input" type="text" {...register('author')} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Format</span>
            </label>
            <FormatSelector inputGroup={false} defaultFormat={teamState.format} handleChange={(e) => setValue('format', e.target.value)} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Notes</span>
            </label>
            <textarea className="textarea-secondary textarea w-full" {...register('notes')} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Paste</span>
            </label>
            <textarea className="textarea-secondary textarea w-full" rows={6} {...register('paste')} />
          </div>
          <div className="modal-action flex-col justify-center">
            <span className="hidden" aria-hidden={true} />
            <button type="submit" className="btn-primary btn-sm btn my-1">
              To PokéPaste
            </button>
            <button type="button" className="btn-secondary btn-sm btn my-1" onClick={() => handleSubmitToFalinks(false)}>
              To Falinks (Private)
            </button>
            <button type="button" className="btn-secondary btn-sm btn my-1" onClick={() => handleSubmitToFalinks(true)}>
              To Falinks (Public)
            </button>
            <button type="button" className="btn-accent btn-sm btn" onClick={copyHandler}>
              Copy the paste to clipboard
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
