import Image from 'next/image'

const photos = [
  '/gallery-1.jpg',
  '/gallery-2.jpg',
  '/gallery-3.jpg',
  '/gallery-4.jpg',
  '/gallery-5.jpg',
  '/gallery-6.jpg',
  '/gallery-7.jpg',
  '/gallery-8.jpg',
]

export function PhotoGrid() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-lg font-medium text-foreground mb-8">
          📸 Recent Installations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div key={i} className="aspect-[4/3] relative rounded-xl overflow-hidden border border-border bg-muted">
              <Image
                src={src}
                alt={`RV solar installation job ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
