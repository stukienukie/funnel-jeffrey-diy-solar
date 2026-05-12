import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center justify-center py-10">
      <Image
        src="/avalon-logo.webp"
        alt="Avalon RV"
        width={320}
        height={96}
        priority
        className="h-20 w-auto"
      />
    </div>
  )
}
