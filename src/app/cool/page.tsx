import Image from "next/image";

export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
      <Image src="/hk.jpg" alt="pic of lantau island" width={500} height={100} />
      <h1 className="text-lg px-10">
        I'm Nick and one cool thing I did was that I went to study abroad in
        China last summer. I like hiking and biking (both of which I got to do a
        lot of in China)
      </h1>
    </div>
  );
}
