import { useForm } from 'react-hook-form';

import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import { S4 } from '@/utils/Helpers';

const Index = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      roomName: `room_name_${S4()}`,
    },
  });

  const gotoRoom = (data: { roomName: string }) => {
    window.open(`/room/${encodeURIComponent(data.roomName)}`, '_self');
  };

  return (
    <Main title={'Home'}>
      <div
        className="hero min-h-[88vh]"
        style={{
          backgroundImage: 'url(assets/images/hero.png)',
        }}
      >
        <div className="hero-overlay bg-opacity-75"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">{AppConfig.title}</h1>
            <p className="mb-5">Build the next sweeping Pokémon team with the power of collaborative</p>
            <form
              className="tooltip tooltip-bottom tooltip-info flex items-center justify-center"
              data-tip="Give your room a name and click to create/join"
              onSubmit={handleSubmit((data) => {
                gotoRoom(data);
              })}
            >
              <input
                type="text"
                placeholder="Room name here"
                required={true}
                maxLength={50}
                className="input-bordered input w-full max-w-xs text-base-content"
                {...register('roomName')}
              />
              <button className="btn btn-primary" role="button">
                Create/Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
