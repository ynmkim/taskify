/* TODO: Image 반응형 Next-Art Direction 이용해서 구현 */
import Image from 'next/image';

export default function Points() {
  return (
    <div className="mt-20 md:mt-[184px]">
      <div className="relative lg:flex w-11/12 max-w-[480px] md:max-w-[664px] lg:max-w-[1200px] mx-auto rounded-lg bg-black-171717">
        <div className="text-center md:text-start md:pl-[60px] lg:mt-[192px]">
          <div className="text-gray-9FA6B2 py-[60px] lg:pt-0 text-lg font-medium md:text-[22px]">Point 1</div>
          <div className="leading-[50px] text-white text-3xl font-bold md:text-4xl">
            <div>일의 우선순위를</div>
            <div>관리하세요.</div>
          </div>
        </div>

        <Image
          className="md:hidden rounded-tl-md rounded-br-md ml-auto mt-48 w-auto h-auto"
          src="/feature1.jpg"
          width={296.11}
          height={248}
          alt="point1"
          priority
        />
        <Image
          className="hidden md:block lg:hidden rounded-tl-md rounded-br-md ml-auto mt-48 w-auto h-auto"
          src="/feature1.jpg"
          width={519.39}
          height={435}
          alt="point1"
          priority
        />
        <Image
          className="hidden lg:block rounded-tl-md rounded-br-md ml-auto mt-48 w-auto h-auto"
          src="/feature1.jpg"
          width={540}
          height={456}
          alt="point1"
          priority
        />
      </div>

      <div className="relative lg:flex mt-[59px] md:mt-[90px] w-11/12 max-w-[480px] md:max-w-[664px] lg:max-w-[1200px] mx-auto rounded-lg bg-black-171717">
        <div className="lg:hidden text-center md:text-start md:pl-[60px] lg:mt-[192px]">
          <div className="text-gray-9FA6B2 py-[60px] lg:pt-0 text-lg font-medium md:text-[22px]">Point 2</div>
          <div className="leading-[50px] text-white text-3xl font-bold md:text-4xl">
            <div>해야 할 일을</div>
            <div>등록하세요.</div>
          </div>
        </div>

        <Image
          className="md:hidden rounded-t-md mx-auto mt-48 w-auto h-auto"
          src="/feature2.jpg"
          width={217.13}
          height={250}
          alt="point2"
          priority
        />
        <Image
          className="hidden md:block lg:hidden rounded-t-md mx-auto mt-48 w-auto h-auto"
          src="/feature2.jpg"
          width={360.44}
          height={415}
          alt="point2"
          priority
        />
        <Image
          className="hidden lg:block rounded-t-md ml-[108px] mt-48 w-auto h-auto"
          src="/feature2.jpg"
          width={436}
          height={502}
          alt="point2"
          priority
        />

        <div className="hidden lg:block text-center md:text-start lg:mt-[192px] ml-[100px]">
          <div className="text-gray-9FA6B2 py-[60px] lg:pt-0 text-lg font-medium md:text-[22px]">Point 2</div>
          <div className="leading-[50px] text-white text-3xl font-bold md:text-4xl">
            <div>해야 할 일을</div>
            <div>등록하세요.</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
