import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="logo" href={'/'}>
      <Image src={'/logo.png'} loading="eager" width={36} height={36} alt="logo" />
      <span>Sephduema</span>
    </Link>
  )
}