import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-zinc-800 mt-7 text-gray-400 flex justify-between items-center flex-col">
      <h1 className="text-xl pb-2 pt-1 ">
        <u>Get in Touch</u>
      </h1>
      <div className="flex items-center">
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/LanreAkintayo"
            className="object-cover rounded-md "
          >
            <Image src="/github.svg" alt="github" width={28} height={28} />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/lanre-akintayo-b6462b238"
            className="object-cover ml-3 rounded-md "
          >
            <Image src="/linkedin.svg" alt="github" width={28} height={28} />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              "https://twitter.com/larry_codes?t=SSIJM9u680cbsqFnXB_c1Q&s=08"
            }
            className="object-cover ml-3 rounded-md "
          >
            <Image src="/twitter.svg" alt="twitter" width={28} height={28} />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/channel/UC3QRrkhldo19vFvcilncvrw"
            className="object-cover ml-3 rounded-md "
          >
            <Image src="/youtube.svg" alt="youtube" width={28} height={28} />
          </a>
        </div>
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href={"mailto:akintayolanre2019@gmail.com"}
            className="object-cover ml-3 rounded-md "
          >
            <Image src="/email.png" alt="email" width={28} height={28} />
          </a>
        </div>
      </div>
      <p className="mt-4 text-sm">© 2023 Made by LarryCodes</p>
    </footer>
  );
}
