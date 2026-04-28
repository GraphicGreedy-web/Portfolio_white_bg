type CollectionLoaderProps = {
  title: string;
  description: string;
  cardClassName: string;
  count?: number;
};

export default function CollectionLoader({
  title,
  description,
  cardClassName,
  count = 8,
}: CollectionLoaderProps) {
  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={`collection-loader-card ${cardClassName}`}
              >
                <span className="image-loader-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
