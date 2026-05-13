import Link from "next/link"
import Image from "next/image"

type HiveLogoProps = {
  className?: string
  imageClassName?: string
}

export function HiveLogo({ className, imageClassName }: HiveLogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className ?? ""}`} aria-label="Hive Financial Systems home">
      <Image
        src="/images/logo.png"
        alt="Hive Financial Systems Logo"
        width={210}
        height={70}
        sizes="(max-width: 768px) 160px, 210px"
        className={imageClassName ?? "h-16 w-auto md:h-[70px]"}
      />
    </Link>
  )
}
