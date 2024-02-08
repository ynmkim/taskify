import SettingBox from './SettingBox';

export default function Settings() {
  const settings = [
    {
      src: '/feature3.jpg',
      width: 300,
      height: 123.87,
      title: '대시보드 설정',
      description: '대시보드 사진과 이름을 변경할 수 있어요.',
    },
    {
      src: '/feature4.jpg',
      width: 300,
      height: 230.81,
      title: '초대',
      description: '새로운 팀원을 초대할 수 있어요.',
    },
    {
      src: '/feature5.jpg',
      width: 300,
      height: 195.48,
      title: '구성원',
      description: '구성원을 초대하고 내보낼 수 있어요.',
    },
  ];
  return (
    <div className="relative mt-[90px] mb-[120px] md:mb-40 w-11/12 max-w-[480px] md:max-w-[664px] lg:max-w-[1200px] mx-auto">
      <div className="text-center lg:text-start text-xl mb-[42px] md:mb-9 md:text-2xl font-bold">
        생산성을 높이는 다양한 설정 ⚡
      </div>
      <div className="flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row lg:items-center lg:justify-between">
        {settings.map((setting, idx) => {
          return (
            <SettingBox
              key={idx}
              src={setting.src}
              width={setting.width}
              height={setting.height}
              title={setting.title}
              description={setting.description}
            />
          );
        })}
      </div>
    </div>
  );
}
