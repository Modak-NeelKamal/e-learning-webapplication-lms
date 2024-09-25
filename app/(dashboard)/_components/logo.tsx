import Image from "next/image";

export const Logo = () => {
  return (
    <div className="inline-block rounded-full overflow-hidden border-4 border-black">
      <Image
        src="/logo.PNG"
        alt="E-Learning Web Application Logo"
        width={130}
        height={130}
        className="rounded-full"
      />
    </div>
  );
};
